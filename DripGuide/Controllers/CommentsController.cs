
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DripGuide.Models;
using DripGuide.Viewmodels;
using System.Drawing.Drawing2D;

namespace DripGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly DripContext _context;

        public CommentsController(DripContext context)
        {
            _context = context;
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
        public async Task<IActionResult> Update(int id, CommentDto commentUpdate)
        {
            var comment = await _context.Comments.FindAsync(id);

            if (comment == null)
            {
                return BadRequest();
            }

            comment.Text = commentUpdate.Text;
            comment.PostId = commentUpdate.PostId;
            comment.User = commentUpdate.User;
            comment.SubmitTime = commentUpdate.SubmitTime;

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

            return Ok();
        }

        // POST: api/Comments
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(CommentDto comment)
        {
            if (comment == null)
            {
                return BadRequest();
            }

            var newComment = new Comment
            {
                Text = comment.Text,
                PostId = comment.PostId,
                User = comment.User,
                SubmitTime = comment.SubmitTime
            };

            _context.Comments.Add(newComment);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCommentById", new { id = newComment.Id }, newComment);
        }

        // DELETE: api/Comments/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CommentExists(int id)
        {
            return _context.Comments.Any(e => e.Id == id);
        }
    }
}
