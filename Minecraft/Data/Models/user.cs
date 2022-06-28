using System.Collections.Generic;

namespace Minecraft.Data.Models
{
    public class user
    {
        public int id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public List<thing> things { get; set; } 
    }
}
