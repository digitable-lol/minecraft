using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Minecraft_5._0.Data;
using Minecraft_5._0.Data.Models;
using PagedList;

namespace Minecraft_5._0.Controllers
{
    [Route("api/things")]
    public class ThingApiController : ControllerBase
    {
        private readonly AppDBContent _context;

        public ThingApiController(AppDBContent context)
        {
            _context = context;
        }

        // GET: api/items
        // Выдает все записи или по строке поиска

        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetItem(string searchstring, int? user, int quantity)
        {
            var items = from i in _context.Things
                        select i;
            if (!String.IsNullOrEmpty(searchstring))
            {
                items = items.Where(i => i.name.ToUpper().Contains(searchstring.ToUpper()));
            }
            if (user != null && user != 0)
            {
                items = items.Where(i => i.user.id == user);
            }
            if (quantity != 0)
            {
                items = items.Where(i => i.quantity == quantity);
            }
            return await items.ToListAsync();
        }

        // GET: api/items/5
        // Выдает запись по ID
        [HttpGet("{id}")]
        public async Task<ActionResult<thing>> GetItem(int id)
        {
            var item = await _context.Things.FindAsync(id);

            if (item == null)
            {
                return NotFound();
            }

            return item;
        }

        // PUT: api/items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // Меняет уже добавленную запись

        [HttpPut("{id}")]
        public async Task<IActionResult> PutItem(int id, thing thing)
        {
            if (id != thing.id)
            {
                return BadRequest();
            }

            _context.Entry(thing).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // POST: api/items/new
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("new")]
        [HttpPost]
        public async Task<ActionResult<thing>> PostItem(thing thing, user user)
        {
            _context.Things.Add(thing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = thing.id }, thing);

        }



        // DELETE: api/items/5
        // Удаляет запись по ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Things.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Things.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Things.Any(e => e.id == id);
        }
    }
}