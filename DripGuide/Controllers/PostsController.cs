using DripGuide.Helpers;
using DripGuide.Models;
using DripGuide.Viewmodels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DripGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly DripContext _context;
        private readonly JwtService _jwtservice;

        public PostsController(DripContext context, JwtService jwtservice)
        {
            _context = context;
            _jwtservice = jwtservice;
        }

        private User FindUserById(int id)
        {
            return _context.Users.FirstOrDefault(e => e.Id == id);
        }

        // GET SEARCHBAR SUGGESTIONS
        [Route("/api/Posts/Suggestions/{query}")]
        [HttpGet]
        public async Task<IActionResult> GetSuggestions([FromRoute] string query)
        {
            var posts = await _context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).OrderBy(e => e.Title).Take(10).ToListAsync();

            return Ok(posts);
        }

        // GET ITEMS PAGE
        [Route("/api/Posts/Page/{pageNumber}/{query?}")]
        [HttpGet]
        public async Task<IActionResult> GetPage([FromRoute] int pageNumber, string? query="")
        {
            var posts = new List<Post>();
            var pageCount = 0;
            var itemsPerPage = 12;

            if (query != "")
            {
                pageCount = (int)Math.Ceiling(_context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).Count() / (decimal)itemsPerPage);
                Response.Headers.Add("Page-Count", pageCount.ToString());
                posts = await _context.Posts.Where(e => !e.Status.Equals(0)).Where(e => e.Title.ToLower().Contains(query.ToLower())).OrderBy(e => e.Title).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();
            }
            else
            {
                pageCount = (int)Math.Ceiling(_context.Posts.Where(e => !e.Status.Equals(0)).Count() / (decimal)itemsPerPage);
                Response.Headers.Add("Page-Count", pageCount.ToString());
                posts = await _context.Posts.Where(e => !e.Status.Equals(0)).OrderBy(e => e.Title).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();
            }

            if (posts.Count == 0)
                return NoContent();

            return Ok(posts);
        }

        // GET PENDING
        [Route("/api/Posts/pending/{pageNumber}")]
        [HttpGet]
        public async Task<IActionResult> GetPending([FromRoute] int pageNumber)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], true);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            var posts = new List<Post>();
            var pageCount = 0;
            var itemsPerPage = 8;

            pageCount = (int)Math.Ceiling(_context.Posts.Where(e => e.Status.Equals(0)).Count() / (decimal)itemsPerPage);
            Response.Headers.Add("Page-Count", pageCount.ToString());
            posts = await _context.Posts.Where(e => e.Status.Equals(0)).OrderBy(e => e.Id).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();

            return Ok(posts);
        }

        // GET: api/Comments/Post
        [HttpGet("{id}/Comments")]
        public async Task<ActionResult<IEnumerable<PostCommentDto>>> GetCommentsByPostId(int id)
        {
            var postExists = await _context.Posts.AnyAsync(p => p.Id == id);
            
            if (!postExists)
            {
                return NotFound();
            }

            var comments = await _context.Comments.Where(c => c.PostId == id).ToListAsync();
            if (comments.Count == 0)
            {
                return NoContent();
            }

            List<PostCommentDto> commentDtos = new();
            foreach (var comment in comments)
            {
                var user = FindUserById(comment.User);
                commentDtos.Add(new PostCommentDto
                {
                    Id = comment.Id,
                    Text = comment.Text,
                    SubmitTime = comment.SubmitTime,
                    UserId = comment.User,
                    UserName = user != null ? user.Name : ""
                });
            }

            return Ok(commentDtos);
        }

        // UPDATE ITEM
        [Route("/api/Posts/confirm/{id}")]
        [HttpPut]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] PostUpdateDto post)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], true);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            if (post == null ||
                post.BrandId != null && !await _context.Brands.AnyAsync(b => b.Id == post.BrandId))
            {
                return BadRequest();
            }

            var existingPost = await _context.Posts.FirstOrDefaultAsync(e => e.Id.Equals(id));
            if (existingPost != null)
            {
                existingPost.Status = 1;
                existingPost.Title = post.Title ?? existingPost.Title;
                existingPost.Description = post.Description ?? existingPost.Description;
                existingPost.Description2 = post.Description2 ?? existingPost.Description2;
                existingPost.Price = post.Price ?? existingPost.Price;
                existingPost.Material = post.Material ?? existingPost.Material;
                existingPost.ReleaseDate = post.ReleaseDate ?? existingPost.ReleaseDate;
                existingPost.StyleCode = post.StyleCode ?? existingPost.StyleCode;
                existingPost.Colorway = post.Colorway ?? existingPost.Colorway;
                existingPost.FK_Brand = post.FK_Brand ?? existingPost.FK_Brand;
                existingPost.Image = post.Image ?? existingPost.Image;
                existingPost.BrandId = post.BrandId ?? existingPost.BrandId;
                _context.Posts.Update(existingPost);
                await _context.SaveChangesAsync();
                return Ok(existingPost);
            }
            else return NotFound("Post not found.");
        }

        // GET ITEM BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if(post == null)
            {
                return NotFound();
            }

            if(post.Status == 0)
            {
                var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], true);
                if (tokenUser.Error != null)
                    return Unauthorized(tokenUser.Error);
            }

            return Ok(post);
        }

        // POST (submit new item)
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PostDto post)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], false);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            if (post == null || !await _context.Brands.AnyAsync(e => e.Id == post.BrandId))
            {
                return BadRequest();
            }

            int status = tokenUser.Role == "admin" ? 1 : 0;

            var newPost = new Post
            {
                Title = post.Title,
                Description = post.Description,
                Description2 = post.Description2,
                Material = post.Material,
                StyleCode = post.StyleCode,
                Colorway = post.Colorway,
                ReleaseDate = post.ReleaseDate,
                Price = post.Price,
                Image = post.Image,
                FK_User = tokenUser.UserId,
                SubmitDate = DateTime.Now,
                Status = status,
                FK_Brand = post.FK_Brand,
                BrandId = post.BrandId
            };
            _context.Posts.Add(newPost);
            await _context.SaveChangesAsync();

            return Created("Created!", newPost);
        }

        // DELETE ITEM
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Headers["Authorization"], true);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            var post = await _context.Posts.FirstOrDefaultAsync(e => e.Id.Equals(id));

            if(post == null)
            {
                return NotFound("Post not found.");
            }
            
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(post);
        }

    }
}
