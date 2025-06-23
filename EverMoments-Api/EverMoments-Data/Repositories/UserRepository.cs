
﻿using EverMoments_Core.DTOs;
using EverMoments_Core.Models;
using EverMoments_Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<User>> GetUsersAsync() => await _context.Users.ToListAsync();
        public async Task<User?> GetUserByIdAsync(int id) => await _context.Users.FindAsync(id);
        public async Task<User?> GetUserByEmailAsync(string email)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.Email == email);
        }
        public async Task<User> CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<bool> UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;
            _context.Users.Remove(user);
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task AddUserAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
        }

        public async Task<PagedResult<User>> GetPagedAsync(int page, int limit, string search = "")
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(u => u.FirstName.Contains(search) ||
                                       u.LastName.Contains(search) ||
                                       u.Email.Contains(search));
            }

            var total = await query.CountAsync();
            var totalPages = (int)Math.Ceiling((double)total / limit);

            var users = await query
                .Skip((page - 1) * limit)
                .Take(limit)
                .OrderByDescending(u => u.CreatedAt)
                .ToListAsync();

            return new PagedResult<User>
            {
                Data = users,
                Total = total,
                Page = page,
                Limit = limit,
                TotalPages = totalPages
            };
        }

        public async Task<int> GetCountAsync()
        {
            return await _context.Users.CountAsync();
        }

        public async Task<int> GetCountByDateAsync(DateTime date)
        {
            return await _context.Users
                .Where(u => u.CreatedAt.Date == date.Date)
                .CountAsync();
        }

    }
}
