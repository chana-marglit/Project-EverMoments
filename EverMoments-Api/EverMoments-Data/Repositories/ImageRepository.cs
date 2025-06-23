using EverMoments_Core.Models;
using EverMoments_Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Data.Repositories
{
    public class ImageRepository : IImageRepository
    {
        private readonly ApplicationDbContext _context;

        public ImageRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Image>> GetByAlbumIdAsync(int albumId)
        {
            return await _context.Images
                .Where(i => i.AlbumId == albumId) // הנחה שיש שדה AlbumId ב-Image
                .ToListAsync();
        }

        public async Task<Image?> GetByIdAsync(int id)
        {
            return await _context.Images.FindAsync(id);
        }

        public async Task AddAsync(Image image)
        {
            await _context.Images.AddAsync(image);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Image image)
        {
            _context.Images.Update(image);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image != null)
            {
                _context.Images.Remove(image);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<IEnumerable<Image>> SearchAsync(int albumId, string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                return await GetByAlbumIdAsync(albumId);
            }

            searchTerm = searchTerm.ToLower();

            return await _context.Images
                .Where(i => i.AlbumId == albumId &&
                           (i.FileName.ToLower().Contains(searchTerm) ||
                            (i.Tags != null && i.Tags.ToLower().Contains(searchTerm))))
                .OrderByDescending(i => i.CreatedAt)
                .ToListAsync();
        }
<<<<<<< HEAD
        public async Task<IEnumerable<Image>> SearchByTagAsync(string tag)
        {
            return await _context.Images
                .Where(i => i.Tags != null && i.Tags.ToLower().Contains(tag.ToLower()))
                .ToListAsync();
        }

        public async Task<int> CountAsync()
        {
            return await _context.Images.CountAsync();
        }

        public async Task AddImageShareAsync(int imageId, int userId)
        {
            _context.Set<UserImageShare>().Add(new UserImageShare
            {
                ImageId = imageId,
                UserId = userId
            });
        }

        public async Task<bool> IsImageSharedWithUser(int imageId, int userId)
        {
            return await _context.Set<UserImageShare>()
                .AnyAsync(x => x.ImageId == imageId && x.UserId == userId);
        }

        public async Task<List<Image>> GetImagesForUserAsync(int userId)
        {
            return await _context.Images
                .Where(img => img.UserId == userId || img.SharedWithUsers.Any(s => s.UserId == userId))
                .ToListAsync();
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
=======
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
}
