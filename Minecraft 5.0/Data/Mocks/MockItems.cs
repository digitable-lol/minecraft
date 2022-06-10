using Minecraft_5._0.Data.Interfasec;
using Minecraft_5._0.Data.Models;
using System.Collections.Generic;
using System;

namespace Minecraft_5._0.Data.Mocks
{
    public class MockItems : IAllItems
    {
        public IEnumerable<Item> Items
        {
            get
            {
                return new List<Item>
                {
                    new Item {
                        name = "Телевизор",
                        owner = "Данил",
                        date="02.06.2022",
                        price = 21000,
                        photoItem = null,
                        photoBill = null,
                        count = 1,
                        comment = "Отдать через два месяца"},
                    new Item {
                        name = "Книга",
                        owner = "Никита",
                        date = "03.06.2022",
                        price = 150,
                        photoItem = null,
                        photoBill = null,
                        count = 2,
                        comment = null}
                };
            }
        }

        public Item getObjectItem(int itemId)
        {
            throw new NotImplementedException();
        }
    }
}
