using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DripGuide.Models;
using DripGuide.Viewmodels;

namespace DripGuide.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrandsController : ControllerBase
    {
        private readonly DripContext _context;

        public BrandsController(DripContext context)
        {
            _context = context;
        }

        // GET: api/Brands
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Brand>>> GetBrands()
        {
            return await _context.Brands.ToListAsync();
        }

        // GET: api/Brands/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Brand>> GetBrandById(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }

            return brand;
        }

        // PUT: api/Brands/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, BrandUpdateDto brandUpdate)
        {
            var brand = await _context.Brands.FindAsync(id);

            if(brand == null) 
            { 
                return BadRequest(); 
            }

            brand.Name = brandUpdate.Name ?? brand.Name;
            brand.Description = brandUpdate.Description ?? brand.Description;
            brand.Founder = brandUpdate.Founder ?? brand.Founder;
            brand.Image = brandUpdate.Image ?? brand.Image;
            brand.Headquarters = brandUpdate.Headquarters ?? brand.Headquarters;
            brand.EstablishmentDate = brandUpdate.EstablishmentDate ?? brand.EstablishmentDate;

            _context.Entry(brand).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BrandExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(brand);
        }

        // POST: api/Brands
        [HttpPost]
        public async Task<ActionResult<Brand>> AddBrand(BrandDto brand)
        {
            if (brand == null)
            {
                return BadRequest();
            }

            var newBrand = new Brand
            {
                Name = brand.Name,
                Description = brand.Description,
                Founder = brand.Founder,
                Image = brand.Image,
                Headquarters = brand.Headquarters,
                EstablishmentDate = brand.EstablishmentDate
            };

            _context.Brands.Add(newBrand);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBrandById", new { id = newBrand.Id }, newBrand);
        }

        // DELETE: api/Brands/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _context.Brands.FindAsync(id);

            if (brand == null)
            {
                return NotFound();
            }
            _context.Entry(brand).Collection(b => b.Posts).Load();

            if (brand.Posts != null && brand.Posts.Count != 0)
            {
                return Conflict("Brand has items!");
            }

            _context.Brands.Remove(brand);
            await _context.SaveChangesAsync();

            return Ok(brand);
        }

        private bool BrandExists(int id)
        {
            return _context.Brands.Any(e => e.Id == id);
        }
    }
}
