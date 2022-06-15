using Microsoft.EntityFrameworkCore;
using Minecraft_5._0.Data.Interfasec;
using Minecraft_5._0.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace Minecraft_5._0.Data.Repositories
{
    public class ItemRepository : IAllItems
    {
        private readonly AppDBContent appDBContent;
        public ItemRepository(AppDBContent appDBContent)
        {
            this.appDBContent = appDBContent;
        }

        public IEnumerable<Item> Items => appDBContent.Items;

        public Item getObjectItem(int itemId)
        {
            throw new NotImplementedException();
        }
    }
}