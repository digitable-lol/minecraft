using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Minecraft_5._0.Data.Models;
using System.Linq;

namespace Minecraft_5._0.Data
{
    public class DBObjects
    {
        public static void Initial(AppDBContent content)
        {
            if (!content.Item.Any())
            {
                content.AddRange(
                    new Item
                    {
                        name = "Телевизор",
                        owner = null,
                        date = null,
                        price = 21000,
                        photo = null,
                        photoBill = null,
                        quantity = 1,
                        discription = "Отдать через два месяца"
                    },
                    new Item
                    {
                        name = "Книга",
                        owner = null,
                        date = null,
                        price = 150,
                        photo = null,
                        photoBill = null,
                        quantity = 2,
                        discription = null
                    }
                );
            }
            content.SaveChanges();
        }
    }
}


