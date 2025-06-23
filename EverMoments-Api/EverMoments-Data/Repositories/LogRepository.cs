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
    public class LogRepository : ILogRepository
    {
        private readonly ApplicationDbContext _context;

        public LogRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Log>> GetLogsByUserIdAsync(int userId)
        {
            return await _context.Logs
                .Where(l => l.UserId == userId)
                .ToListAsync();
        }

        public async Task AddLogAsync(Log log)
        {
            await _context.Logs.AddAsync(log);
            await _context.SaveChangesAsync();
        }
    }
}
