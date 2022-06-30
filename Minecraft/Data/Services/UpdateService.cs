using Minecraft.Data.Models;
using System.IO;
using System.Linq;

namespace Minecraft.Data.Services
{
    public class UpdateService
    {
        public static thing Update(AppDBContent context, int id, thing thing)
        {
            var thing1 = context.Things.Where(thing => thing.id == id).FirstOrDefault();
            if (thing1 == null)
            {
                return null;
            }
            if (thing.photo != null)
            {
                string pathp = "wwwroot/" + thing1.photosrc;
                pathp = Path.Combine(Directory.GetCurrentDirectory(), pathp);
                System.IO.File.Delete(pathp);
                thing1.photo = thing.photo;
                thing1.photosrc = thing.getSrcphoto();
            }
            if (thing.photoBill != null)
            {
                if (thing1.photoBillsrc != null)
                {
                    string pathb = "wwwroot/" + thing1.photoBillsrc;
                    pathb = Path.Combine(Directory.GetCurrentDirectory(), pathb);
                    System.IO.File.Delete(pathb);
                }
                thing1.photoBill = thing.photoBill;
                thing1.photoBillsrc = thing.getSrcphotoBill();
            }
            thing1.name = thing.name;
            thing1.price = thing.price; 
            thing1.date = thing.date;
            thing1.quantity = thing.quantity;
            thing1.userid = thing.userid;
            thing1.discription = thing.discription;
            return thing1;
        }
    }
}
