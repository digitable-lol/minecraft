using Minecraft.Data.Filters;
using System;

namespace Minecraft.Data.Interfaces
{
    public interface IUriServiсe
    {
        public Uri GetPageUri(PaginationFilter filter, string route);
    }
}
