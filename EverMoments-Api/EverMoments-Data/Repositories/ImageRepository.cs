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
    }
}
