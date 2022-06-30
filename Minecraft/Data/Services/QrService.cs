using QRCoder;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Linq;
using System.Text;
using System.Drawing;

namespace Minecraft.Data.Services
{
    public class QrService
    {
        public static string fileNameWithPath { get; set; }
        public static string fileName { get; set; }
        public static string Getfilename()
        {
            fileName = Convert.ToString(Guid.NewGuid()) + ".jpg";
            return fileName;
        }
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
            fileName = Getfilename();

            string fileNameWithPath = Path.Combine(path, fileName);
            if (thing == null)
            {
                return null;
            }
            QRCodeGenerator qrGenerator = new QRCodeGenerator();
            QRCodeData qrCodeData = qrGenerator.CreateQrCode(str, QRCodeGenerator.ECCLevel.Q, true);
            QRCode qrCode = new QRCode(qrCodeData);
            qrCode.GetGraphic(5).Save(fileNameWithPath);
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
