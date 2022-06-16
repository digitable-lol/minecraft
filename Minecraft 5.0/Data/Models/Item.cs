using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
namespace Minecraft_5._0.Data.Models
{
    public class Item
    {
        public int id { get; set; }
        public string name { get; set; }
        public string owner { get; set; }
        public decimal? price { get; set; }
        public string photoItem { get; set; }
        public string? photoBill { get; set; }
        public int? count { get; set; }
        public DateTime? date { get; set; }
        public string? comment { get; set; }
    }
}
