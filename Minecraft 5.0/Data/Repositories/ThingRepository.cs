using Microsoft.EntityFrameworkCore;
using Minecraft_5._0.Data.Interfasec;
using Minecraft_5._0.Data.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;

namespace Minecraft_5._0.Data.Repositories
{
    public class ThingRepository : IAllThings
    {
        private readonly AppDBContent appDBContent;
        public ThingRepository(AppDBContent appDBContent)
        {
            this.appDBContent = appDBContent;
        }

        public IEnumerable<thing> things => appDBContent.Things;

        public thing getObjectItem(int thingid)
        {
            throw new NotImplementedException();
        }
    }
}