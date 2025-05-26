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
    }
}
