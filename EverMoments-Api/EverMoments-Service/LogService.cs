using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using EverMoments_Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Service
{
    public class LogService : ILogService
    {
        private readonly ApplicationDbContext _context;

        public LogService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddLogAsync(int userId, string action, string? description = null)
        {
            var log = new Log
            {
                UserId = userId,
                Action = action,
                Description = description
            };

            await _context.Logs.AddAsync(log);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Log>> GetLogsByUserIdAsync(int userId)
        {
            return await _context.Logs
                .Where(log => log.UserId == userId)
                .ToListAsync();
        }
    }
}
