using Minecraft_5._0.Data.Filters;
using System;

namespace Minecraft_5._0.Data.Interfaces
{
    public interface IUriServiсe
    {
        public Uri GetPageUri(PaginationFilter filter, string route);
    }
}
