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
    public class usersApiController : ControllerBase
    {
        private readonly AppDBContent _context;

        public usersApiController(AppDBContent context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<user>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
    }
}
