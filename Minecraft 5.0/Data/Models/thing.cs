using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minecraft_5._0.Data.Models
{
    public class thing
    {
        public int id { get; set; }
        public string name { get; set; }
        public decimal? price { get; set; }
        public string photo { get; set; }
        public string? photoBill { get; set; }
        public int? quantity { get; set; }
        public DateTime? date { get; set; }
        public string? discription { get; set; }
        public user user { get; set; }
    }
}
