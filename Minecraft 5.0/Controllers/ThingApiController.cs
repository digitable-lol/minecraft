using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Minecraft_5._0.Data;
using Minecraft_5._0.Data.Filters;
using Minecraft_5._0.Data.Helpers;
using Minecraft_5._0.Data.Interfaces;
using Minecraft_5._0.Data.Models;
using Minecraft_5._0.Data.Services;
using Minecraft_5._0.Data.Wrappers;
using Minecraft_5._0.ViewModels;
using PagedList;

namespace Minecraft_5._0.Controllers
{
    [Route("api/things")]
    public class ThingApiController : ControllerBase
    {
        private readonly AppDBContent _context;
        private IUriServiсe uriService;
        public ThingApiController(AppDBContent context, IUriServiсe uriService)
        {
            _context = context;
            this.uriService = uriService;
        }

        // GET: api/items
        // Выдает все записи или по строке поиска

        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetThings([FromQuery] PaginationFilter filter)
        {
            if (filter.PageNumber < 0) { filter.PageNumber = 1; }
            if (filter.PageSize < 0) { filter.PageSize = 6; }
            var route = Request.Path.Value;
            var things = await _context.Things
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();
            var totalRecords = await _context.Things.CountAsync();
            var pagedResponse = PaginationHelper.CreatePagedReponse<thing>(things, filter, totalRecords, uriService, route);
            return Ok(pagedResponse);
            //return things;
        }
        [Route("search")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetThings(string searchstring) 
        {
            var things = from i in _context.Things
                         select i;
            if (!String.IsNullOrEmpty(searchstring))
            {
                things = things.Where(i => i.name.ToUpper().Contains(searchstring.ToUpper()));
            }
            return await things.ToListAsync();
        }

        [Route("filtration")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetThings(int? user, int quantity)
        {
            var things = from i in _context.Things
                         select i;
            if (user != null && user != 0)
            {
                things = things.Where(i => i.user.id == user);
            }
            if (quantity != 0)
            {
                things = things.Where(i => i.quantity == quantity);
            }
            return await things.ToListAsync();
        }

        // GET: api/items/5
        // Выдает запись по ID
        [HttpGet("{id}")]
        public async Task<ActionResult<thing>> GetThing(int id)
        {
            var thing = await _context.Things.Where(t => t.id == id).FirstOrDefaultAsync();
            if (thing == null)
            {
                return NotFound();
            }
            return thing;
        }

        // PUT: api/items/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // Меняет уже добавленную запись

        [HttpPut("{id}")]
        public async Task<IActionResult> Putthing(int id, thing thing)
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
        public async Task<ActionResult<thing>> Postthing(thing thing)
        {
            _context.Things.Add(thing);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetItem", new { id = thing.id }, thing);

        }



        // DELETE: api/items/5
        // Удаляет запись по ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletething(int id)
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