using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using EverMoments_Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EverMoments_Service
{
    public class ShareService : IShareService
    {
        private readonly IShareRepository _shareRepository;
        private readonly IImageRepository _imageRepository;
        private readonly IUserRepository _userRepository;

        public ShareService(IShareRepository shareRepository, IImageRepository imageRepository, IUserRepository userRepository)
        {
            _shareRepository = shareRepository;
            _imageRepository = imageRepository;
            _userRepository = userRepository;
        }

        public async Task<bool> ShareImageWithUsersAsync(int imageId, int sharedByUserId, List<int> userIds)
        {
            try
            {
                Console.WriteLine($"ShareService: Sharing image {imageId} by user {sharedByUserId} with users: {string.Join(", ", userIds)}");

                // בדיקה שהתמונה קיימת
                var image = await _imageRepository.GetByIdAsync(imageId);
                if (image == null)
                {
                    Console.WriteLine($"Image {imageId} not found");
                    return false;
                }

                // בדיקה שהמשתמש הוא הבעלים של התמונה
                if (image.UserId != sharedByUserId)
                {
                    Console.WriteLine($"User {sharedByUserId} is not the owner of image {imageId} (owner: {image.UserId})");
                    return false;
                }

                // בדיקה שכל המשתמשים קיימים
                var validUserIds = new List<int>();
                foreach (var userId in userIds)
                {
                    if (userId == sharedByUserId)
                    {
                        Console.WriteLine($"Skipping self-share for user {userId}");
                        continue; // לא לשתף עם עצמו
                    }

                    var user = await _userRepository.GetUserByIdAsync(userId);
                    if (user != null)
                    {
                        validUserIds.Add(userId);
                        Console.WriteLine($"User {userId} is valid for sharing");
                    }
                    else
                    {
                        Console.WriteLine($"User {userId} not found, skipping");
                    }
                }

                if (validUserIds.Any())
                {
                    Console.WriteLine($"Sharing with {validUserIds.Count} valid users");
                    await _shareRepository.ShareImageWithUsersAsync(imageId, sharedByUserId, validUserIds);
                    Console.WriteLine("Share operation completed successfully");
                }
                else
                {
                    Console.WriteLine("No valid users to share with");
                }

                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in ShareImageWithUsersAsync: {ex.Message}");
                Console.WriteLine($"Stack trace: {ex.StackTrace}");
                return false;
            }
        }

        public async Task<bool> UnshareImageAsync(int imageId, int userId)
        {
            try
            {
                await _shareRepository.UnshareImageAsync(imageId, userId);
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in UnshareImageAsync: {ex.Message}");
                return false;
            }
        }

        public async Task<IEnumerable<SharedImage>> GetSharedImagesForUserAsync(int userId)
        {
            return await _shareRepository.GetSharedImagesForUserAsync(userId);
        }

        public async Task<IEnumerable<SharedImage>> GetImageSharesAsync(int imageId)
        {
            return await _shareRepository.GetImageSharesAsync(imageId);
        }

        public async Task<bool> IsImageSharedWithUserAsync(int imageId, int userId)
        {
            return await _shareRepository.IsImageSharedWithUserAsync(imageId, userId);
        }

        public async Task<IEnumerable<Image>> GetSharedImagesAsync(int userId)
        {
            return await _shareRepository.GetSharedImagesAsync(userId);
        }

        public async Task<bool> CanUserAccessImageAsync(int imageId, int userId)
        {
            var image = await _imageRepository.GetByIdAsync(imageId);
            if (image == null)
                return false;

            // בעלים של התמונה
            if (image.UserId == userId)
                return true;

            // תמונה ששותפה איתו
            return await IsImageSharedWithUserAsync(imageId, userId);
        }
    }
}
