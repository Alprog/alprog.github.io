using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

namespace Cropper
{
    internal class Program
    {
        static Rectangle SrcRect = new Rectangle(200, 630, 720, 390);

        static void Crop(string srcPath, string dstPath)
        {
            var srcBitmap = new Bitmap(srcPath);
            var dstBitmap = new Bitmap(SrcRect.Width, SrcRect.Height);
            var graphic = Graphics.FromImage(dstBitmap);
            graphic.CompositingQuality = CompositingQuality.HighQuality;
            graphic.DrawImage(srcBitmap, 0, 0, SrcRect, GraphicsUnit.Point );
            dstBitmap.Save(dstPath, ImageFormat.Png);
        }

        static void Main(string[] args)
        {
            var srcFolderPath = "C:\\Users\\alpro\\Desktop\\MatrixImages\\Sheets";
            var dstFolderPath = "C:\\Users\\alpro\\Desktop\\MatrixImages\\Out";

            var index = 0;
            foreach (var file in new DirectoryInfo(srcFolderPath).GetFiles())
            {
                var srcPath = file.FullName;
                var fileName = string.Format("sheet_{0}.png", ++index); 
                var dstPath = Path.Combine(dstFolderPath, fileName);
                Crop(srcPath, dstPath);
            }
        }
    }
}
