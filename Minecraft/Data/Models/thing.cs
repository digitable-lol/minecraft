using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;

namespace Minecraft.Data.Models
{
    public class thing
    {
        [Key]
        public int id { get; set; }
        public string name { get; set; }
        public decimal? price { get; set; }
        [NotMapped]
        public IFormFile photo { get; set; }
        public string photosrc { get; set; }
        [NotMapped]
        public IFormFile? photoBill { get; set; }
        public string? photoBillsrc { get; set; }
        public int? quantity { get; set; }
        public DateTime? date { get; set; }
        public string? discription { get; set; }
        [Required]
        [ForeignKey("user")]
        public int userid { get; set; }
        public virtual user user { get; set; }
        public string getSrcphoto()
        {

            string path = "wwwroot/photo/photothing";

            //create folder if not exist
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            string fileName = Convert.ToString(Guid.NewGuid()) + ".jpg";
            string fileNameWithPath = Path.Combine(path, fileName);
            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
            {
                this.photo.CopyTo(stream);
            }
            path = "photo/photothing";
            fileNameWithPath = Path.Combine(path, fileName);
            return fileNameWithPath;
        }
        public string getSrcphotoBill()
        {
            string path = "wwwroot/photo/photoBill";

            //create folder if not exist
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);

            string fileName = Convert.ToString(Guid.NewGuid()) + ".jpg";
            string fileNameWithPath = Path.Combine(path, fileName);

            using (var stream = new FileStream(fileNameWithPath, FileMode.Create))
            {
                this.photoBill.CopyTo(stream);
            }
            path = "photo/photoBill";
            fileNameWithPath = Path.Combine(path, fileName);
            return fileNameWithPath;
        }
    }
}
