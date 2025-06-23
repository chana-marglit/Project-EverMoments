<<<<<<< HEAD
﻿using EverMoments_Core.DTOs;
using EverMoments_Core.Models;
=======
﻿using EverMoments_Core.Models;
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsersAsync();
        Task<User?> GetUserByIdAsync(int id);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(User user);
        Task<bool> UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
        Task AddUserAsync(User user);
<<<<<<< HEAD
        Task<PagedResult<User>> GetPagedAsync(int page, int limit, string search = "");
        Task<int> GetCountAsync();
        Task<int> GetCountByDateAsync(DateTime date);
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
}
