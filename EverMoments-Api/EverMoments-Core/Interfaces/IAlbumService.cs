using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Interfaces
{
    public interface IAlbumService
    {
        Task<Album?> GetAlbumByIdAsync(int id);
        Task<IEnumerable<Album>> GetAlbumsByUserIdAsync(int userId);
        Task AddAlbumAsync(Album album);
        Task UpdateAlbumAsync(Album album);
        Task DeleteAlbumAsync(int id);
    }
}
