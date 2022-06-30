using Microsoft.EntityFrameworkCore;
using Minecraft.Data.Models;

namespace Minecraft.Data
{
    public class AppDBContent : DbContext
    {
        public AppDBContent(DbContextOptions<AppDBContent> options)
            : base(options)
        {

        }
        public DbSet<thing> Things { get; set; }
        public DbSet<user> Users { get; set; } 
    }
}
