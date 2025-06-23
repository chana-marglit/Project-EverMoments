using EverMoments_Core.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EverMoments_Core.Interfaces
{
    public interface IShareRepository 
    {
        Task<IEnumerable<SharedImage>> GetSharedImagesForUserAsync(int userId);
        Task<IEnumerable<SharedImage>> GetImageSharesAsync(int imageId);
        Task<bool> IsImageSharedWithUserAsync(int imageId, int userId);
        Task ShareImageWithUsersAsync(int imageId, int sharedByUserId, List<int> userIds);
        Task UnshareImageAsync(int imageId, int userId);
        Task<IEnumerable<Image>> GetSharedImagesAsync(int userId);
    }
}
