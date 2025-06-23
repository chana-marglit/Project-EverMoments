//using EverMoments_Core.DTOs.EverMoments_Core.DTOs;
//using EverMoments_Core.Models;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace EverMoments_Core.Interfaces
//{
//    public interface IAdminUserRepository : IRepository<User>
//    {
//        Task<PagedResult<AdminUserDto>> GetUsersPagedAsync(int page, int limit, string search = "");
//        Task<AdminUserDto> GetUserWithStatsAsync(int id);
//        Task<int> GetTotalUsersCountAsync();
//        Task<int> GetNewUsersCountAsync(DateTime date);
//        Task<List<UserStatsDto>> GetTopUsersByStorageAsync(int count = 10);
//    }

//    public interface IAdminAlbumRepository : IRepository<Album>
//    {
//        Task<PagedResult<AdminAlbumDto>> GetAlbumsPagedAsync(int page, int limit, int? userId = null);
//        Task<AdminAlbumDto> GetAlbumWithStatsAsync(int id);
//        Task<int> GetTotalAlbumsCountAsync();
//        Task<List<AdminAlbumDto>> GetRecentAlbumsAsync(int count = 10);
//    }

//    public interface IAdminImageRepository : IRepository<Image>
//    {
//        Task<PagedResult<AdminImageDto>> GetImagesPagedAsync(int page, int limit, int? albumId = null, int? userId = null);
//        Task<AdminImageDto> GetImageWithDetailsAsync(int id);
//        Task<int> GetTotalImagesCountAsync();
//        Task<int> GetNewImagesCountAsync(DateTime startDate, DateTime endDate);
//        Task<long> GetTotalStorageUsedAsync();
//        Task<List<StorageUsageDto>> GetStorageBreakdownAsync();
//    }

//    public interface IAdminLogRepository : IRepository<Log>
//    {
//        Task<PagedResult<AdminLogDto>> GetLogsPagedAsync(int page, int limit, string search = "", string action = "");
//        Task<PagedResult<AdminLogDto>> GetUserLogsPagedAsync(int userId, int page, int limit);
//        Task<List<ActivityTimelineDto>> GetActivityTimelineAsync(int days);
//        Task LogAdminActionAsync(int userId, string action, string description, string ipAddress = "", string userAgent = "");
//    }

//    public interface IAdminStatsRepository
//    {
//        Task<SystemStatsDto> GetSystemStatsAsync();
//        Task<List<ActivityTimelineDto>> GetActivityTimelineAsync(int days);
//        Task<List<StorageUsageDto>> GetStorageUsageAsync();
//        Task<List<UserStatsDto>> GetUserStatsAsync(int page, int limit);
//    }
//}
