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
using System.Drawing;
using System.IO;
using System.Text;
using System.Drawing.Imaging;
using System.Collections;
using IronBarCode;


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

        // GET: api/things
        // Выдает все записи или по строке поиска
        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetThings([FromQuery] PaginationFilter filter, string searchstr, int? userid, int quantity, decimal? priceLow, decimal? priceHigh, DateTime? minDate, DateTime? maxDate, bool photoBill)
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
                things = things.Where(t => t.photoBillsrc != null);
            }
            if (userid != null)
            {
                things = things.Where(t => t.userid == userid);
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
            var thingCount = things.ToList();
            things = things.Include(t => t.user)
                .Skip((filter.PageNumber - 1) * filter.PageSize)
                .Take(filter.PageSize);
            var thingsList = things.ToList();
            var totalRecords = thingCount.Count();
            var pagedResponse = PaginationHelper.CreatePagedReponse<thing>(thingsList, filter, totalRecords, uriService, route);
            return Ok(pagedResponse);
        }

        // GET: api/things/5
        // Выдает запись по ID
        [HttpGet("{id}")]
        public string GetQr(int id)
        {
            var thing = _context.Things.Include(t => t.user).Where(t => t.id == id).FirstOrDefault();
            string str = $"Name: {thing.name} \nUser: {thing.user.Firstname} {thing.user.Lastname}\nPrice: {thing.price}\nDate: {thing.date}\nDiscription: {thing.discription}";
            string path = "wwwroot/photo/qr";
            if (str.Length >= 4296)
            {
                str = $"Name: {thing.name} \nUser: {thing.user.Firstname} {thing.user.Lastname}\nPrice: {thing.price}\nDate: {thing.date}";
            }
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            string fileName = Convert.ToString(Guid.NewGuid()) + ".jpg";

            string fileNameWithPath = Path.Combine(path, fileName);
            if (thing == null)
            {
                return null;
            }
            byte[] BinaryData = Encoding.UTF8.GetBytes(str);
            QRCodeWriter.CreateQrCode(BinaryData, 200).SaveAsPng(fileNameWithPath);
            path = "photo/qr";
            fileNameWithPath = Path.Combine(path, fileName);
            return fileNameWithPath;
        }
        [Route("DeleteQR")]
        [HttpDelete]

        public void DeleteQR(string path)
        {
            path = "wwwroot/" + path;
            path = Path.Combine(Directory.GetCurrentDirectory(), path);
            System.IO.File.Delete(path);
        }

        // PUT: api/things/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // Меняет уже добавленную запись
        [HttpPut("{id}")]
        public async Task<IActionResult> Putthing(int id, thing thing)
        {

            if (id != thing.id)
            {
                return BadRequest();
            }
            string pt = thing.photosrc;
            string ptb = thing.photoBillsrc;                                                                                                                                                                                                                                                                  
            if (pt != null)
            {
                System.IO.File.Delete(pt);
            }
            thing.photosrc = thing.getSrcphoto();
            if (ptb != null)
            {
                System.IO.File.Delete(ptb);
            }
            if (thing.photoBill != null)
            {
                thing.photoBillsrc = thing.getSrcphotoBill();
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

        // POST: api/things/new
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("new")]
        [HttpPost]
        public async Task<ActionResult<thing>> Postthing(thing thing)
        {
            thing.photosrc = thing.getSrcphoto();
            if (thing.photoBill != null)
            {
                thing.photoBillsrc = thing.getSrcphotoBill();
            }
            if (thing.date == null)
            {
                thing.date = DateTime.Now;
            }
            _context.Entry(thing).State = EntityState.Added;
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetThings", new { id = thing.id }, thing);
        }

        // DELETE: api/things/5
        // Удаляет запись по ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletething(int id)
        {
            var thing = await _context.Things.FindAsync(id);
            if (thing == null)
            {
                return NotFound();
            }
            if (thing.photosrc != null)
            {
                string path = "wwwroot/" + thing.photosrc;
                path = Path.Combine(Directory.GetCurrentDirectory(), path);
                System.IO.File.Delete(path);
            }
            if (thing.photoBillsrc != null)
            {
                string path = "wwwroot/" + thing.photoBillsrc;
                path = Path.Combine(Directory.GetCurrentDirectory(), path);
                System.IO.File.Delete(path);
            }
            _context.Things.Remove(thing);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        [Route("delete")]
        [HttpDelete]
        public async Task<IActionResult> DeleteAll()
        {
            for (int i = 0; i < _context.Things.Count(); i++)
            {
                var thing = _context.Things.FirstOrDefault();
                if (thing.photosrc != null)
                {
                    string path = "wwwroot/" + thing.photosrc;
                    path = Path.Combine(Directory.GetCurrentDirectory(), path);
                    System.IO.File.Delete(path);
                }
                if (thing.photoBillsrc != null)
                {
                    string path = "wwwroot/" + thing.photoBillsrc;
                    path = Path.Combine(Directory.GetCurrentDirectory(), path);
                    System.IO.File.Delete(path);
                }
            }
            _context.Things.RemoveRange(_context.Things);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool ItemExists(int id)
        {
            return _context.Things.Any(e => e.id == id);
        }
    }
}