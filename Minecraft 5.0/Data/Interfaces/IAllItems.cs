using Minecraft_5._0.Data.Models;
using System.Collections.Generic;

namespace Minecraft_5._0.Data.Interfasec
{
    public interface IAllItems
    {
        IEnumerable<Item> Items { get;}
        Item getObjectItem(int itemId);
    }
}
