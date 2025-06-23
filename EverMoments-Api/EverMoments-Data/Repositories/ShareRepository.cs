using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EverMoments_Data.Repositories
{
    public class ShareRepository : IShareRepository
    {
        private readonly ApplicationDbContext _context;

        public ShareRepository(ApplicationDbContext context) {
         
            _context = context;
        }

        public async Task<IEnumerable<SharedImage>> GetSharedImagesForUserAsync(int userId)
        {
            return await _context.SharedImages
                .Include(s => s.Image)
                .Include(s => s.SharedByUser)
                .Where(s => s.SharedWithUserId == userId && s.IsActive)
                .OrderByDescending(s => s.SharedAt)
                .ToListAsync();
        }

        public async Task<IEnumerable<SharedImage>> GetImageSharesAsync(int imageId)
        {
            return await _context.SharedImages
                .Include(s => s.SharedWithUser)
                .Where(s => s.ImageId == imageId && s.IsActive)
                .ToListAsync();
        }

        public async Task<bool> IsImageSharedWithUserAsync(int imageId, int userId)
        {
            return await _context.SharedImages
                .AnyAsync(s => s.ImageId == imageId && s.SharedWithUserId == userId && s.IsActive);
        }

        public async Task ShareImageWithUsersAsync(int imageId, int sharedByUserId, List<int> userIds)
        {
            var existingShares = await _context.SharedImages
                .Where(s => s.ImageId == imageId && userIds.Contains(s.SharedWithUserId))
                .ToListAsync();

            foreach (var userId in userIds)
            {
                var existingShare = existingShares.FirstOrDefault(s => s.SharedWithUserId == userId);

                if (existingShare != null)
                {
                    // אם כבר קיים, פשוט נעדכן שהוא פעיל
                    existingShare.IsActive = true;
                    existingShare.SharedAt = DateTime.UtcNow;
                }
                else
                {
                    // יצירת שיתוף חדש
                    var sharedImage = new SharedImage
                    {
                        ImageId = imageId,
                        SharedByUserId = sharedByUserId,
                        SharedWithUserId = userId,
                        SharedAt = DateTime.UtcNow,
                        IsActive = true
                    };
                    _context.SharedImages.Add(sharedImage);
                }
            }

            await _context.SaveChangesAsync();
        }

        public async Task UnshareImageAsync(int imageId, int userId)
        {
            var sharedImage = await _context.SharedImages
                .FirstOrDefaultAsync(s => s.ImageId == imageId && s.SharedWithUserId == userId);

            if (sharedImage != null)
            {
                sharedImage.IsActive = false;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<Image>> GetSharedImagesAsync(int userId)
        {
            return await _context.SharedImages
                .Include(s => s.Image)
                .Where(s => s.SharedWithUserId == userId && s.IsActive)
                .Select(s => s.Image)
                .OrderByDescending(i => i.CreatedAt)
                .ToListAsync();
        }
    }
}
