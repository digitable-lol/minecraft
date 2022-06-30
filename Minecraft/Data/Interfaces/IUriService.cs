using Minecraft.Data.Filters;
using System;

namespace Minecraft.Data.Interfaces
{
    public interface IUriService
    {
        public Uri GetPageUri(PaginationFilter filter, string route);
    }
}
