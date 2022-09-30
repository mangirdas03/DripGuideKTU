﻿using DripGuide.Helpers;
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

            return Ok(posts);
        }

        // GET PENDING
        [Route("/api/Posts/pending/{pageNumber}")]
        [HttpGet]
        public async Task<IActionResult> GetPending([FromRoute] int pageNumber)
        {
            var posts = new List<Post>();
            var pageCount = 0;
            var itemsPerPage = 8;

            pageCount = (int)Math.Ceiling(_context.Posts.Where(e => e.Status.Equals(0)).Count() / (decimal)itemsPerPage);
            Response.Headers.Add("Page-Count", pageCount.ToString());
            posts = await _context.Posts.Where(e => e.Status.Equals(0)).OrderBy(e => e.Id).Skip(itemsPerPage * (pageNumber - 1)).Take(itemsPerPage).ToListAsync();

            return Ok(posts);
        }

        // UPDATE ITEM
        [Route("/api/Posts/confirm/{id}")]
        [HttpPost]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] PostDto post)
        {
            try
            {
                //var jwt = Request.Cookies["jwt"];
                //if (jwt == null)
                //    return Unauthorized();
                //var token = _jwtservice.Verify(jwt);

                var userId = 1; //int.Parse(token.Issuer);

                var existingPost = await _context.Posts.FirstOrDefaultAsync(e => e.Id.Equals(id));
                if (existingPost != null)
                {
                    existingPost.Status = 1;
                    existingPost.Title = post.Title;
                    existingPost.Description = post.Description;
                    existingPost.Description2 = post.Description2;
                    existingPost.Price = post.Price;
                    existingPost.Material = post.Material;
                    existingPost.ReleaseDate = post.ReleaseDate;
                    existingPost.StyleCode = post.StyleCode;
                    existingPost.Colorway = post.Colorway;
                    existingPost.FK_Brand = post.FK_Brand;
                    existingPost.FK_User = userId;
                    existingPost.Image = post.Image;
                    existingPost.SubmitDate = DateTime.Now;
                    _context.Posts.Update(existingPost);
                    await _context.SaveChangesAsync();
                    return Ok("Post confirmed.");
                }
                else return NotFound("Post not found.");
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        // GET ITEM BY ID
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            return Ok(post);
        }

        // POST (submit new item)
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PostDto post)
        {
            try
            {
                //var jwt = Request.Cookies["jwt"];
                //if (jwt == null)
                //    return Unauthorized();
                //var token = _jwtservice.Verify(jwt);

                var userId = 1; // int.Parse(token.Issuer);
                //var user = FindUserById(userId);

                var status = 0;
                //if(user.Role == true)
                //    status = 1;

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
                    FK_User = userId,
                    SubmitDate = DateTime.Now,
                    Status = status,
                    FK_Brand = post.FK_Brand
                };
                _context.Posts.Add(newPost);
                await _context.SaveChangesAsync();

                return Created("Created!", newPost);
            }
            catch (Exception)
            {
                return Unauthorized();
            }
        }

        // DELETE ITEM
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var post = await _context.Posts.FirstOrDefaultAsync(e => e.Id.Equals(id));

            if(post == null)
            {
                return NotFound("Post not found.");
            }
            
            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok("Post removed.");
        }
    }
}