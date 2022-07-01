using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Minecraft.Data;
using Minecraft.Data.Filters;
using Minecraft.Data.Helpers;
using Minecraft.Data.Interfaces;
using Minecraft.Data.Models;
using Minecraft.Data.Services;
using Minecraft.Data.Wrappers;
using System.Drawing;
using System.IO;
using System.Text;
using System.Drawing.Imaging;
using System.Collections;
using System.ComponentModel.DataAnnotations;
using System.Runtime.InteropServices;
using Minecraft.Data.Exception;
using Microsoft.AspNetCore.Hosting.Server;

namespace Minecraft.Controllers
{
    [Route("api/things")]
    public class ThingApiController : ControllerBase
    {
        private readonly AppDBContent _context;
        private IUriService uriService;
        public ThingApiController(AppDBContent context, IUriService uriService)
        {
            _context = context;
            this.uriService = uriService;
        }

        // GET: api/things
        // Выдает все записи или по строке поиска
        [HttpGet]
        public async Task<ActionResult<IEnumerable<thing>>> GetThings([FromQuery] PaginationFilter filter, string searchstr, int? userid, int quantity, decimal? priceLow, decimal? priceHigh, DateTime? minDate, DateTime? maxDate, bool photoBill)
        {
            var things = FiltrationService.filtration(_context, searchstr, userid, quantity, priceLow, priceHigh, minDate, maxDate, photoBill);
            var route = Request.Path.Value;
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
        [HttpGet("getqr/{id}")]
        public FileResult GetFile(int id)
        {
            QrService.fileNameWithPath = QrService.GetQr(id, _context);
            string file_type = "application/jpg";
            return File(QrService.fileNameWithPath, file_type, QrService.fileName);
        }

        // PUT: api/things/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        // Меняет уже добавленную запись
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Putthing(int id, thing thing)
        {
            thing = UpdateService.Update(_context, id, thing);
            if (thing == null) { return BadRequest(); }
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
            try
            {
                thing.photosrc = thing.getSrcphoto();
            }
            catch (NullReferenceException e)
            {
                throw new MyCustomException("Нельзя добавить предмет без фото", e);
            }
            if (thing.photoBill != null) { thing.photoBillsrc = thing.getSrcphotoBill(); }
            if (thing.date == null) { thing.date = DateTime.Now; }
            _context.Entry(thing).State = EntityState.Added;
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetThings", new { id = thing.id }, thing);
        }

        // DELETE: api/things/5
        // Удаляет запись по ID
        [HttpDelete("delete/{id}")]
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

        [Route("deleteqr")]
        [HttpDelete]

        public void DeleteQR()
        {
            QrService.DeleteQR();
        }

        [Route("deleteall")]
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