using Microsoft.AspNetCore.Mvc;
using Minecraft_5._0.Data.Interfasec;
using Minecraft_5._0.ViewModels;

namespace Minecraft_5._0.Controllers
{
    public class ItemsController:Controller
    {
        private readonly IAllItems _allItems;
        public ItemsController(IAllItems iAllItems)
        {
            _allItems = iAllItems;
        }
        public ViewResult ListItems()
        {
            ItemsListViewModel obj = new ItemsListViewModel();
            obj.allItems = _allItems.Items;
            return View(obj);
        }
    }

}
