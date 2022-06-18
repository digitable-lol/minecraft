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
using Minecraft_5._0.Controllers;
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
        public async Task<ActionResult<IEnumerable<thing>>> GetThings([FromQuery] PaginationFilter filter, string searchstr, string userFN, string userLN, int quantity, decimal? priceLow, decimal? priceHigh, DateTime? minDate, DateTime? maxDate, bool photoBill)
        {
            var things = from t in _context.Things.Include(t => t.user)
                         select t;
            priceLow = priceLow == null ? _context.Things.Min(t => t.price) : priceLow;
            priceHigh = priceHigh == null ? _context.Things.Max(t => t.price) : priceHigh;
            minDate = minDate == null ? _context.Things.Min(t => t.date) : minDate;
            maxDate = maxDate == null ? _context.Things.Max(t => t.date) : maxDate;
            var route = Request.Path.Value;
            if (!String.IsNullOrEmpty(searchstr))
            {
                things = things.Where(t => t.name.ToUpper().Contains(searchstr.ToUpper()));
            }

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
                things = things.Where(t => (t.date >= minDate) && (t.date <= maxDate));
            }
            things = things.Include(t => t.user)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize);
            var thingsList = things.ToList(); 
            var totalRecords = thingsList.Count();
            var pagedResponse = PaginationHelper.CreatePagedReponse<thing>(thingsList, filter, totalRecords, uriService, route);
            return Ok(pagedResponse);
        }

        // GET: api/items/5
        // Выдает запись по ID
        [HttpGet("{id}")]
        public async Task<ActionResult<thing>> GetThing(int id)
        {
            var thing = await _context.Things.Include(t => t.user).Where(t => t.id == id).FirstOrDefaultAsync();
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
        public async Task<ActionResult<thing>> Postthing(string name, int price, string photo, string photoBill, int quantity, DateTime? date, string disc, string userFN, string userLN) 
        {
            thing thing = new();
            user user = new();
            foreach (user users in _context.Users.ToList())
            {
                if (users.Firstname == userFN && users.Lastname == userLN)
                {

                    thing.userid = users.id;

                }
                else
                {
                    return NotFound();                   
                }
            }
            
            thing.name = name;
            thing.price = price;
            thing.photo = photo;
            thing.photoBill = photoBill;
            if (date == null) { thing.date = DateTime.Now; }
            thing.quantity = quantity;
            thing.discription = disc;

            _context.Entry(thing).State=EntityState.Added;
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetThings", new { id = thing.id }, thing);  
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