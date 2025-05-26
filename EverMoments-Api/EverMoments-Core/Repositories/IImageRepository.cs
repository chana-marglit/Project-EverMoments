using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Repositories
{
    public interface IImageRepository
    {
        Task<Image?> GetByIdAsync(int id);
        Task<IEnumerable<Image>> GetByAlbumIdAsync(int albumId);
        Task AddAsync(Image image);
        Task UpdateAsync(Image image);
        Task DeleteAsync(int id);
        Task<IEnumerable<Image>> SearchAsync(int albumId, string searchTerm);
    }
}

