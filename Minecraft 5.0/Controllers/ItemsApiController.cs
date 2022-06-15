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
    [Route("api/items")]
    public class ItemsApiController : ControllerBase
    {
        private readonly AppDBContent _context;

        public ItemsApiController(AppDBContent context)
        {
            _context = context;
        }

        // GET: api/items
        // Выдает все записи или по строке поиска

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItem(string searchstring)
        {
            var items = from i in _context.Items
                        select i;
            if (!String.IsNullOrEmpty(searchstring))
            {
                items = items.Where(i => i.name.ToUpper().Contains(searchstring.ToUpper()));
            }
            return await items.ToListAsync();
        }

        // GET: api/items/5
        // Выдает запись по ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _context.Items.FindAsync(id);

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
        public async Task<IActionResult> PutItem(int id, Item item)
        {
            if (id != item.id)
            {
                return BadRequest();
            }

            _context.Entry(item).State = EntityState.Modified;

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
        public async Task<ActionResult<Item>> PostItem(Item item, user user)
        {
            _context.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = item.id }, item);

        }



        // DELETE: api/items/5
        // Удаляет запись по ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(int id)
        {
            var item = await _context.Items.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }

            _context.Items.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Items.Any(e => e.id == id);
        }
    }
}