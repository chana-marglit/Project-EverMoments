using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Interfaces
{
    public interface ILogService
    {
        Task<IEnumerable<Log>> GetLogsByUserIdAsync(int userId);
        Task AddLogAsync(int userId, string action, string? description = null);
<<<<<<< HEAD
        Task<int> CountLogsAsync();
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
}
