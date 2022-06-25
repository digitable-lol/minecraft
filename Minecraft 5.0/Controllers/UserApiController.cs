using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Minecraft_5._0.Data;
using Minecraft_5._0.Data.Models;

namespace Minecraft_5._0.Controllers
{
    [Route("api/users")]
    public class UserApiController : ControllerBase
    {
        private readonly AppDBContent _context;

        public UserApiController(AppDBContent context)
        {
            _context = context;
        }

        // GET: api/users

        [HttpGet]
        public async Task<ActionResult<IEnumerable<user>>> GetUsers()
        {
            var users = from t in _context.Users.Include(u => u.things)
                         select t;
            return await users.ToListAsync();
        }

        // GET: api/users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<user>> Getuser(int id)
        {
            var user = await _context.Users.Include(u => u.things).Where(u => u.id == id).FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // PUT: api/users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Putuser(int id, user user)
        {
            user = await _context.Users.Include(u => u.things).FirstOrDefaultAsync();
            if (id != user.id)
            {
                return BadRequest();
            }
            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!userExists(id))
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

        // POST: api/users/new
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Route("new")]
        [HttpPost]
        public async Task<ActionResult<user>> Postuser(user user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("Getuser", new { id = user.id }, user);
        }

        // DELETE: api/UserApi/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Deleteuser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool userExists(int id)
        {
            return _context.Users.Any(e => e.id == id);
        }
    }
}
