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
            var user1 = _context.Users.FirstOrDefault(e => e.Name.Equals(registerdto.Name));
            var user2 = _context.Users.FirstOrDefault(e => e.Email.Equals(registerdto.Email));
            if (user1 != null || user2 != null)
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

            User user = FindUserByName(logindto.Name);

            if(user == null) return BadRequest("User not found!");

            if (!BCryptNet.Verify(logindto.Password, user.Password))
            {
                return BadRequest("Invalid credentials!");
            }

            var jwt = _jwtservice.Generate(user.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok(user);
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
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = FindUserById(userId);

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
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = FindUserById(userId);
                if (user.Role)
                {
                    int pageCount = 0;
                    int itemsPerPage = 5;
                    pageCount = (int)Math.Ceiling(_context.Users.Where(e => !e.Id.Equals(userId)).Count() / (decimal)itemsPerPage);
                    //Response.Headers.Add("Page-Count", pageCount.ToString());

                    List<User> users = new List<User>();
                    users = await _context.Users.Where(e => !e.Id.Equals(userId)).OrderBy(e => e.Id).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();
                    return Ok(users);
                }

                return Ok(user);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }


        [HttpPost("changerole/{id}")]
        public async Task<IActionResult> ChangeRole([FromRoute] int id)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = FindUserById(userId);
                if (user.Role)
                {
                    User selectedUser = await _context.Users.FirstOrDefaultAsync(e => e.Id.Equals(id));
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
                return Unauthorized();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        [HttpPost("deleteuser/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int id)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = FindUserById(userId);
                if (user.Role)
                {
                    User selectedUser = await _context.Users.FirstOrDefaultAsync(e => e.Id.Equals(id));
                    if (selectedUser != null)
                    {
                        _context.Users.Remove(selectedUser);
                        await _context.SaveChangesAsync();
                        return Ok();
                    }
                    return NotFound();
                }
                return Unauthorized();
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }



        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");
            return Ok("Logged out");
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword(PasswordDTO pw)
        {
            try
            {
                var jwt = Request.Cookies["jwt"];
                if (jwt == null)
                    return Unauthorized();
                var token = _jwtservice.Verify(jwt);

                int userId = int.Parse(token.Issuer);

                var user = FindUserById(userId);

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
            catch (Exception)
            {
                return Unauthorized();
            }
        }
    }
}
