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
    public class AlbumRepository : IAlbumRepository
    {
        private readonly ApplicationDbContext _context;

        public AlbumRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Album>> GetByUserIdAsync(int userId)
        {
            return await _context.Albums
                .Where(a => a.UserId == userId) // הנחה שיש שדה UserId ב-Album
                .Include(a => a.Images)
                .ToListAsync();
        }

        public async Task<Album?> GetByIdAsync(int id)
        {
            return await _context.Albums.Include(a => a.Images).FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task AddAsync(Album album)
        {
            // בדוק אם המשתמש קיים
            var userExists = await _context.Users.AnyAsync(u => u.Id == album.UserId);
            if (!userExists)
            {
                throw new Exception("User does not exist.");
            }

            // הוסף את האלבום
            _context.Albums.Add(album);
            await _context.SaveChangesAsync();
        }


        public async Task UpdateAsync(Album album)
        {
            _context.Albums.Update(album);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var album = await _context.Albums.FindAsync(id);
            if (album != null)
            {
                _context.Albums.Remove(album);
                await _context.SaveChangesAsync();
            }
        }
    }

}
