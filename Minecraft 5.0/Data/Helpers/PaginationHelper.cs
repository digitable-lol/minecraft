using Minecraft_5._0.Data.Filters;
using Minecraft_5._0.Data.Interfaces;
using Minecraft_5._0.Data.Models;
using Minecraft_5._0.Data.Wrappers;
using System;
using System.Collections.Generic;

namespace Minecraft_5._0.Data.Helpers
{
    public class PaginationHelper
    {
        public static PagedResponse<List<thing>> CreatePagedReponse<thing>(List<thing> pagedData,PaginationFilter filter, int totalRecords, IUriServiсe uriService, string route)
        {
            var respose = new PagedResponse<List<thing>>(pagedData, filter.PageNumber, filter.PageSize);
            var totalPages = ((double)totalRecords / (double)filter.PageSize);
            int roundedTotalPages = Convert.ToInt32(Math.Ceiling(totalPages));
            respose.NextPage =
                filter.PageNumber >= 1 && filter.PageNumber < roundedTotalPages
                ? uriService.GetPageUri(new PaginationFilter(filter.PageNumber + 1, filter.PageSize), route)
                : null;
            respose.PreviousPage =
                filter.PageNumber - 1 >= 1 && filter.PageNumber <= roundedTotalPages
                ? uriService.GetPageUri(new PaginationFilter(filter.PageNumber - 1, filter.PageSize), route)
                : null;
            respose.FirstPage = uriService.GetPageUri(new PaginationFilter(1, filter.PageSize), route);
            respose.LastPage = uriService.GetPageUri(new PaginationFilter(roundedTotalPages, filter.PageSize), route);
            respose.TotalPages = roundedTotalPages;
            respose.TotalRecords = totalRecords;
            return respose;
        }
    }
}
