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
<<<<<<< HEAD
        Task<IEnumerable<Image>> SearchByTagAsync(string tag);
        Task<int> CountAsync();
        Task AddImageShareAsync(int imageId, int userId);
        Task<bool> IsImageSharedWithUser(int imageId, int userId);
        Task<List<Image>> GetImagesForUserAsync(int userId);
        Task SaveChangesAsync();
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
}

