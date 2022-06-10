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
                        owner = "Данил",
                        date = "02.06.2022",
                        price = 21000,
                        photoItem = "",
                        photoBill = null,
                        count = 1,
                        comment = "Отдать через два месяца"
                    },
                    new Item
                    {
                        name = "Книга",
                        owner = "Никита",
                        date = "03.06.2022",
                        price = 150,
                        photoItem = "",
                        photoBill = null,
                        count = 2,
                        comment = null
                    }
                );
            }
            content.SaveChanges();
        }
    }
}


