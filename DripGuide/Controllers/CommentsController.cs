using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DripGuide.Models;
using DripGuide.Viewmodels;
using DripGuide.Helpers;

namespace DripGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly DripContext _context;
        private readonly JwtService _jwtservice;

        public CommentsController(DripContext context, JwtService jwtservice)
        {
            _context = context;
            _jwtservice = jwtservice;
        }

        // GET: api/Comments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            return await _context.Comments.ToListAsync();
        }

        // GET: api/Comments/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetCommentById(int id)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            return comment;
        }

        // PUT: api/Comments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, CommentUpdateDto commentUpdate)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Cookies["jwt"], false);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return BadRequest();
            }

            if(comment.User != tokenUser.UserId)
            {
                return Unauthorized("You do not have permissions to access this!");
            }

            comment.Text = commentUpdate.Text ?? comment.Text;
            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CommentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(comment);
        }

        // POST: api/Comments
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(CommentDto comment)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Cookies["jwt"], false);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            if (comment == null || !await _context.Posts.AnyAsync(e => e.Id == comment.PostId))
            {
                return BadRequest();
            }

            var newComment = new Comment
            {
                Text = comment.Text,
                PostId = comment.PostId,
                User = tokenUser.UserId,
                SubmitTime = DateTime.Now
            };

            _context.Comments.Add(newComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommentById", new { id = newComment.Id }, newComment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var tokenUser = _jwtservice.ParseUser(Request.Cookies["jwt"], false);
            if (tokenUser.Error != null)
                return Unauthorized(tokenUser.Error);

            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            if(comment.User != tokenUser.UserId && tokenUser.Role != "admin")
            {
                return Unauthorized("You do not have permissions to access this!");
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return Ok(comment);
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
