using DripGuide.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DripGuide.Viewmodels;
using BCryptNet = BCrypt.Net.BCrypt;
using DripGuide.Helpers;

namespace DripGuide.Controllers
{
    [Route("api")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DripContext _context;
        private readonly JwtService _jwtservice;

        public AuthController(DripContext context, JwtService jwtservice)
        {
            _context = context;
            _jwtservice = jwtservice;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(RegisterDTO registerdto)
        {
            var sameName = _context.Users.FirstOrDefault(e => e.Name.Equals(registerdto.Name));
            var sameEmail = _context.Users.FirstOrDefault(e => e.Email.Equals(registerdto.Email));
            if (sameName != null || sameEmail != null)
                return Conflict();

            var user = new User
            {
                Name = registerdto.Name,
                Password = BCryptNet.HashPassword(registerdto.Password),
                Email = registerdto.Email,
                Role = false
            };
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Created("Created!", user);
        }


        [HttpPost("login")]
        public IActionResult Login(LoginDTO logindto)
        {
            var user = FindUserByName(logindto.Name);

            if(user == null) 
                return BadRequest("User not found!");

            if (!BCryptNet.Verify(logindto.Password, user.Password))
            {
                return BadRequest("Invalid credentials!");
            }

            var jwt = _jwtservice.Generate(user.Id, user.Role);
            var auth = new TokenDto { Name = user.Name, Role = user.Role, Token = jwt };

            return Ok(auth);
        }

        private User FindUserByName(string name)
        {
            return _context.Users.FirstOrDefault(e => e.Name == name);
        }
        private User FindUserById(int id)
        {
            return _context.Users.FirstOrDefault(e => e.Id == id);
        }

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            try
            {
                var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], false);
                if (tokenUser.Error != null)
                    return Unauthorized(tokenUser.Error);

                var user = FindUserById(tokenUser.UserId);

                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpGet("users/{pageNumber}")]
        public async Task<IActionResult> GetUsers([FromRoute] int pageNumber)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], true);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            int pageCount = 0;
            int itemsPerPage = 5;
            pageCount = (int)Math.Ceiling(_context.Users.Where(e => !e.Id.Equals(tokenUser.UserId)).Count() / (decimal)itemsPerPage);
            Response.Headers.Add("Page-Count", pageCount.ToString());

            List<User> users = new List<User>();
            users = await _context.Users.Where(e => !e.Id.Equals(tokenUser.UserId)).OrderBy(e => e.Id).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();
            return Ok(users);
        }

        [HttpPut("changerole/{id}")]
        public async Task<IActionResult> ChangeRole([FromRoute] int id)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], true);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            var selectedUser = await _context.Users.FirstOrDefaultAsync(e => e.Id.Equals(id));
            if(selectedUser != null)
            {
                if (selectedUser.Role)
                    selectedUser.Role = false;
                else selectedUser.Role = true;
                _context.Users.Update(selectedUser);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpDelete("user/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], true);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            var selectedUser = await _context.Users.FirstOrDefaultAsync(e => e.Id.Equals(id));
            if (selectedUser != null)
            {
                _context.Users.Remove(selectedUser);
                await _context.SaveChangesAsync();
                return Ok();
            }
            return NotFound();
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt", new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true
            });
            return Ok("Logged out");
        }

        [HttpPut("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] PasswordDTO pw)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], false);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            var user = FindUserById(tokenUser.UserId);

            if(BCryptNet.Verify(pw.currentPass, user.Password) && pw.newPass == pw.newPassConfirm)
            {
                user.Password = BCryptNet.HashPassword(pw.newPass);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();
                return Ok("Changed.");
            }
            else
            {
                return Unauthorized();
            }
        }
    }
}
