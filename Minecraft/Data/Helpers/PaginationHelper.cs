using Minecraft.Data.Filters;
using Minecraft.Data.Interfaces;
using Minecraft.Data.Models;
using Minecraft.Data.Wrappers;
using System;
using System.Collections.Generic;

namespace Minecraft.Data.Helpers
{
    public class PaginationHelper
    {
        public static PagedResponse<IEnumerable<thing>> CreatePagedReponse<thing>(List<thing> pagedData,PaginationFilter filter, int totalRecords, IUriServiсe uriService, string route)
        {
            var respose = new PagedResponse<IEnumerable<thing>>(pagedData, filter.PageNumber, filter.PageSize);
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
