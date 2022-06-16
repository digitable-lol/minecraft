using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
            var route = Request.Path.Value;
            var things = await _context.Things
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();
            var totalRecords = await _context.Things.CountAsync();
            var pagedResponse = PaginationHelper.CreatePagedReponse<thing>(things, filter, totalRecords, uriService, route);
            return Ok(pagedResponse);
        }
        [Route("search")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetThings(string searchstr)
        {
            var things = from t in _context.Things
                         select t;
            if (!String.IsNullOrEmpty(searchstr))
            {
                things = things.Where(t => t.name.ToUpper().Contains(searchstr.ToUpper()));
            }
            return await things.ToListAsync();
        }

        [Route("filtration")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetThings(string userFN, string userLN, int quantity, decimal? priceLow, decimal? priceHigh, DateTime? minDate, DateTime? maxDate, bool photoBill)
        {
            priceLow = priceLow == null ? _context.Things.Min(t => t.price) : priceLow;
            priceHigh = priceHigh == null ? _context.Things.Max(t => t.price) : priceHigh;
            minDate = minDate == null ? _context.Things.Min(t => t.date) : minDate;
            maxDate = maxDate == null ? _context.Things.Max(t => t.date) : maxDate;

            var things = from t in _context.Things
                         select t;
            if (photoBill)
            {
                things = things.Where(t => t.photoBill != null);
            }
            if (userFN != null && userLN != null)
            {
                things = things.Where(t => t.user.Firstname == userFN && t.user.Lastname == userLN);
            }
            if (quantity != 0)
            {
                things = things.Where(t => t.quantity == quantity);
            }
            if (priceLow != null || priceHigh != null)
            {
                things = things.Where(t => (t.price <= priceHigh) && (t.price >= priceLow));
            }
            if (minDate != null || maxDate != null)
            {
                things = things.Where(t => (t.date <= minDate) && (t.date >= maxDate));
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
        public async Task<ActionResult<thing>> Postthing(thing thing, user user) 
        {
            thing.date = DateTime.Now;
            if (user.id != thing.user.id) 
            {
                _context.Things.Add(thing);
            }
            _context.Entry(thing).State=EntityState.Added;
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetItem", new { id = thing.id }, thing);  
        }

        // DELETE: api/items/5
        // Удаляет запись по ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletething(int id)
        {
            var thing = await _context.Things.FindAsync(id);
            if (thing == null)
            {
                return NotFound();
            }

            _context.Things.Remove(thing);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ItemExists(int id)
        {
            return _context.Things.Any(e => e.id == id);
        }
    }
}