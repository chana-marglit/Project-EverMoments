using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Repositories
{
    public interface IAlbumRepository
    {
        Task<Album?> GetByIdAsync(int id);
        Task<IEnumerable<Album>> GetByUserIdAsync(int userId);
        Task AddAsync(Album album);
        Task UpdateAsync(Album album);
        Task DeleteAsync(int id);
    }
}
