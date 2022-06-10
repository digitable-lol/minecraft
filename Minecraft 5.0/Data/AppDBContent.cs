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
        public DbSet<Item> Item { get; set; }
    }
#pragma warning disable CS1591
    public class TodoContext : DbContext
    {
        public TodoContext(DbContextOptions<TodoContext> options) : base(options) { }

        public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    }
#pragma warning restore CS1591
}
