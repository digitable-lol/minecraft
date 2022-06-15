using Minecraft_5._0.Data.Models;
using System.Collections.Generic;

namespace Minecraft_5._0.Data.Interfasec
{
    public interface IAllThings
    {
        IEnumerable<thing> things { get;}
        thing getObjectItem(int thingId);
    }
}
