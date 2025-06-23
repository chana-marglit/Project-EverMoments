using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using EverMoments_Core.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Service
{
    public class AlbumService : IAlbumService
    {
        private readonly IAlbumRepository _albumRepository;

        public AlbumService(IAlbumRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }

        public async Task<Album?> GetAlbumByIdAsync(int id)
        {
            return await _albumRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Album>> GetAlbumsByUserIdAsync(int userId)
        {
            return await _albumRepository.GetByUserIdAsync(userId);
        }

        public async Task AddAlbumAsync(Album album)
        {
            await _albumRepository.AddAsync(album);
        }

        public async Task UpdateAlbumAsync(Album album)
        {
            await _albumRepository.UpdateAsync(album);
        }

        public async Task DeleteAlbumAsync(int id)
        {
            await _albumRepository.DeleteAsync(id);
        }
    }
}
