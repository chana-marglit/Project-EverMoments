using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Interfaces
{
    public interface IImageService
    {
        Task<Image?> GetImageByIdAsync(int id);
        Task<IEnumerable<Image>> GetImagesByAlbumIdAsync(int albumId);
        Task AddImageAsync(Image image);
        Task UpdateImageAsync(Image image);
        Task DeleteImageAsync(int id);
        Task<IEnumerable<Image>> SearchImagesAsync(int albumId, string searchTerm);
<<<<<<< HEAD
        Task<IEnumerable<Image>> SearchImagesByTagAsync(string tag);
        Task<int> CountImagesAsync();
        Task ShareImageWithUsersAsync(int imageId, List<int> userIds);
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
}
