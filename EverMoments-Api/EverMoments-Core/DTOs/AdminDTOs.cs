using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.DTOs
{
    using System;
    using System.Collections.Generic;

    namespace EverMoments_Core.DTOs
    {
        // DTOs עבור תוצאות עמוד
        public class PagedResult<T>
        {
            public List<T> Data { get; set; } = new();
            public int Total { get; set; }
            public int Page { get; set; }
            public int Limit { get; set; }
            public int TotalPages { get; set; }
        }

        // DTOs עבור סטטיסטיקות מערכת
        public class SystemStatsDto
        {
            public int TotalUsers { get; set; }
            public int TotalAlbums { get; set; }
            public int TotalImages { get; set; }
            public long TotalStorage { get; set; }
            public int NewUsersToday { get; set; }
            public int NewImagesThisWeek { get; set; }
        }

        // DTOs עבור משתמשים
        public class AdminUserDto
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Role { get; set; }
            public DateTime CreatedAt { get; set; }
            public DateTime? UpdatedAt { get; set; }
            public int AlbumCount { get; set; }
            public int ImageCount { get; set; }
            public long StorageUsed { get; set; }
            public DateTime? LastActive { get; set; }
        }

        public class CreateAdminUserDto
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public string Role { get; set; } = "user";
        }

        public class UpdateAdminUserDto
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Role { get; set; }
            public string Password { get; set; } // אופציונלי
        }

        // DTOs עבור אלבומים
        public class AdminAlbumDto
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string Name { get; set; }
            public string Description { get; set; }
            public DateTime CreatedAt { get; set; }
            public int ImageCount { get; set; }
            public long StorageUsed { get; set; }
        }

        // DTOs עבור תמונות
        public class AdminImageDto
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public string UserName { get; set; }
            public int AlbumId { get; set; }
            public string AlbumName { get; set; }
            public string FileUrl { get; set; }
            public string FileName { get; set; }
            public string FileType { get; set; }
            public long FileSize { get; set; }
            public string Tags { get; set; }
            public DateTime CreatedAt { get; set; }
        }

        // DTOs עבור יומן פעילות מנהל
        public class AdminLogDto
        {
            public int Id { get; set; }
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string Action { get; set; }
            public string Description { get; set; }
            public string IpAddress { get; set; }
            public string UserAgent { get; set; }
            public DateTime CreatedAt { get; set; }
        }

        // DTOs עבור סטטיסטיקות פעילות
        public class ActivityTimelineDto
        {
            public DateTime Date { get; set; }
            public int UserLogins { get; set; }
            public int ImageUploads { get; set; }
            public int AlbumsCreated { get; set; }
            public int NewUsers { get; set; }
        }

        public class StorageUsageDto
        {
            public string Category { get; set; }
            public long Size { get; set; }
            public string Color { get; set; }
            public double Percentage { get; set; }
        }

        public class UserStatsDto
        {
            public int UserId { get; set; }
            public string UserName { get; set; }
            public string Email { get; set; }
            public int AlbumCount { get; set; }
            public int ImageCount { get; set; }
            public long StorageUsed { get; set; }
            public DateTime? LastActive { get; set; }
            public DateTime CreatedAt { get; set; }
        }
    }

}
