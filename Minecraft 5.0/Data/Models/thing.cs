using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Minecraft_5._0.Data.Models
{
    public class thing
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public decimal? price { get; set; }
        public string photo { get; set; }
        public string? photoBill { get; set; }
        public int? quantity { get; set; }
        public DateTime? date { get; set; }
        public string? discription { get; set; }
        [Required]
        [ForeignKey("user")]
        public int userid { get; set; }
        public virtual user user { get; set; }
    }
}
