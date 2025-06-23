    //using EverMoments_Core.Interfaces;
    //using EverMoments_Core.Models;
    //using EverMoments_Core.DTOs;
    //using Microsoft.EntityFrameworkCore;
    //using System;
    //using System.Collections.Generic;
    //using System.Linq;
    //using System.Threading.Tasks;
    //using EverMoments_Core.DTOs.EverMoments_Core.DTOs;

    //namespace EverMoments_Data.Repositories
    //{
    //    public class AdminUserRepository : Repository<User>, IAdminUserRepository
    //    {
    //        public AdminUserRepository(ApplicationDbContext context) : base(context) { }

    //        public async Task<EverMoments_Core.DTOs.PagedResult<AdminUserDto>> GetUsersPagedAsync(int page, int limit, string search = "")
    //        {
    //            var query = _context.Users.AsQueryable();

    //            if (!string.IsNullOrEmpty(search))
    //            {
    //                query = query.Where(u => u.FirstName.Contains(search) ||
    //                                       u.LastName.Contains(search) ||
    //                                       u.Email.Contains(search));
    //            }

    //            var total = await query.CountAsync();
    //            var totalPages = (int)Math.Ceiling((double)total / limit);

    //            var users = await query
    //                .Skip((page - 1) * limit)
    //                .Take(limit)
    //                .OrderByDescending(u => u.CreatedAt)
    //                .Select(u => new AdminUserDto
    //                {
    //                    Id = u.Id,
    //                    FirstName = u.FirstName,
    //                    LastName = u.LastName,
    //                    Email = u.Email,
    //                    Role = u.Role,
    //                    CreatedAt = u.CreatedAt,
    //                    UpdatedAt = u.UpdatedAt,
    //                    AlbumCount = u.Albums.Count(),
    //                    ImageCount = u.Albums.SelectMany(a => a.Images).Count(),
    //                    StorageUsed = u.Albums.SelectMany(a => a.Images).Sum(i => i.FileSize ?? 0),
    //                    LastActive = u.LastLoginDate
    //                })
    //                .ToListAsync();

    //            return new EverMoments_Core.DTOs.PagedResult<AdminUserDto>
    //            {
    //                Data = users,
    //                Total = total,
    //                Page = page,
    //                Limit = limit,
    //                TotalPages = totalPages
    //            };
    //        }

    //        public async Task<AdminUserDto> GetUserWithStatsAsync(int id)
    //        {
    //            return await _context.Users
    //                .Where(u => u.Id == id)
    //                .Select(u => new AdminUserDto
    //                {
    //                    Id = u.Id,
    //                    FirstName = u.FirstName,
    //                    LastName = u.LastName,
    //                    Email = u.Email,
    //                    Role = u.Role,
    //                    CreatedAt = u.CreatedAt,
    //                    UpdatedAt = u.UpdatedAt,
    //                    AlbumCount = u.Albums.Count(),
    //                    ImageCount = u.Albums.SelectMany(a => a.Images).Count(),
    //                    StorageUsed = u.Albums.SelectMany(a => a.Images).Sum(i => i.FileSize ?? 0),
    //                    LastActive = u.LastLoginDate
    //                })
    //                .FirstOrDefaultAsync();
    //        }

    //        public async Task<int> GetTotalUsersCountAsync()
    //        {
    //            return await _context.Users.CountAsync();
    //        }

    //        public async Task<int> GetNewUsersCountAsync(DateTime date)
    //        {
    //            return await _context.Users
    //                .Where(u => u.CreatedAt.Date == date.Date)
    //                .CountAsync();
    //        }

    //        public async Task<List<UserStatsDto>> GetTopUsersByStorageAsync(int count = 10)
    //        {
    //            return await _context.Users
    //                .Select(u => new UserStatsDto
    //                {
    //                    UserId = u.Id,
    //                    UserName = $"{u.FirstName} {u.LastName}",
    //                    Email = u.Email,
    //                    AlbumCount = u.Albums.Count(),
    //                    ImageCount = u.Albums.SelectMany(a => a.Images).Count(),
    //                    StorageUsed = u.Albums.SelectMany(a => a.Images).Sum(i => i.FileSize ?? 0),
    //                    LastActive = u.LastLoginDate,
    //                    CreatedAt = u.CreatedAt
    //                })
    //                .OrderByDescending(u => u.StorageUsed)
    //                .Take(count)
    //                .ToListAsync();
    //        }
    //    }
    //}


