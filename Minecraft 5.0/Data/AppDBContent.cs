using Microsoft.EntityFrameworkCore;
using Minecraft_5._0.Data.Models;

namespace Minecraft_5._0.Data
{
    public class AppDBContent : DbContext
    {
        public AppDBContent(DbContextOptions<AppDBContent> options)
            : base(options)
        {

        }
        public DbSet<thing> Things { get; set; } = null!;
        public DbSet<user> Users { get; set; } = null!;
    }
}
