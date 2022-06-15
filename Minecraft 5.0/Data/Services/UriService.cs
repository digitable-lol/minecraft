using Microsoft.AspNetCore.WebUtilities;
using Minecraft_5._0.Data.Filters;
using Minecraft_5._0.Data.Interfaces;
using System;

namespace Minecraft_5._0.Data.Services
{
    public class UriService: IUriServiсe
    {
        private readonly string _baseUri;
        public UriService(string baseUri)
        {
            _baseUri = baseUri;
        }
        public Uri GetPageUri(PaginationFilter filter, string route)
        {
            var _enpointUri = new Uri(string.Concat(_baseUri, route));
            var modifiedUri = QueryHelpers.AddQueryString(_enpointUri.ToString(), "pageNumber", filter.PageNumber.ToString());
            modifiedUri = QueryHelpers.AddQueryString(modifiedUri, "pageSize", filter.PageSize.ToString());
            return new Uri(modifiedUri);
        }
    }
}
