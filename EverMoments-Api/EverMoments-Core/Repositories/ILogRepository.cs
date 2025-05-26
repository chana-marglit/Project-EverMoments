using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Repositories
{
    public interface ILogRepository
    {
        Task<IEnumerable<Log>> GetLogsByUserIdAsync(int userId);
        Task AddLogAsync(Log log);
    }
}
