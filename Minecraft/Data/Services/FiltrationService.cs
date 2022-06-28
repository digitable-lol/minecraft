using Microsoft.EntityFrameworkCore;
using Minecraft.Data.Models;
using System;
using System.Linq;

namespace Minecraft.Data.Services
{
    public class FiltrationService
    {
        public static IQueryable<thing> filtration (AppDBContent context, string searchstr, int? userid, int quantity, decimal? priceLow, decimal? priceHigh, DateTime? minDate, DateTime? maxDate, bool photoBill)
        {
            var things = from t in context.Things.Include(t => t.user)
                         select t;
            priceLow = priceLow == null ? context.Things.Min(t => t.price) : priceLow;
            priceHigh = priceHigh == null ? context.Things.Max(t => t.price) : priceHigh;
            minDate = minDate == null ? context.Things.Min(t => t.date) : minDate;
            maxDate = maxDate == null ? context.Things.Max(t => t.date) : maxDate;
            if (!String.IsNullOrEmpty(searchstr)){ things = things.Where(t => t.name.ToUpper().Contains(searchstr.ToUpper())); }
            if (photoBill){ things = things.Where(t => t.photoBillsrc != null); }
            if (userid != null) { things = things.Where(t => t.userid == userid); }
            if (quantity != 0) {things = things.Where(t => t.quantity == quantity); }
            if (priceLow != null || priceHigh != null) { things = things.Where(t => (t.price <= priceHigh) && (t.price >= priceLow)); }
            if (minDate != null || maxDate != null) { things = things.Where(t => (t.date >= minDate) && (t.date <= maxDate)); }
            return things;
        }
    }
}
