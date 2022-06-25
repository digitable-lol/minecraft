using IronBarCode;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Text;

namespace Minecraft_5._0.Data.Services
{
    public class QrService
    {
        public static string fileNameWithPath { get; set; }
        public static string GetQr(int id, AppDBContent context)
        {
            var thing = context.Things.Include(t => t.user).Where(t => t.id == id).FirstOrDefault();
            string str = $"Name: {thing.name} \nUser: {thing.user.Firstname} {thing.user.Lastname}\nPrice: {thing.price}\nDate: {thing.date}\nDiscription: {thing.discription}";
            string path = "wwwroot/photo/qr";
            if (str.Length >= 4296)
            {
                str = $"Name: {thing.name} \nUser: {thing.user.Firstname} {thing.user.Lastname}\nPrice: {thing.price}\nDate: {thing.date}";
            }
            if (!Directory.Exists(path))
                Directory.CreateDirectory(path);
            string fileName = Convert.ToString(Guid.NewGuid()) + ".jpg";

            string fileNameWithPath = Path.Combine(path, fileName);
            if (thing == null)
            {
                return null;
            }
            byte[] BinaryData = Encoding.UTF8.GetBytes(str);
            QRCodeWriter.CreateQrCode(BinaryData, 200).SaveAsPng(fileNameWithPath);
            path = "photo/qr";
            fileNameWithPath = Path.Combine(path, fileName);
            return fileNameWithPath;
        }
        public static void DeleteQR()
        {
            string path = "wwwroot/" + fileNameWithPath;
            path = Path.Combine(Directory.GetCurrentDirectory(), path);
            File.Delete(path);
        }
    }
}
