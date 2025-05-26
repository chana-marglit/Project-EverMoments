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
    public class ImageService : IImageService
    {
        private readonly IImageRepository _imageRepository;

        public ImageService(IImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
        }

        public async Task<Image?> GetImageByIdAsync(int id)
        {
            return await _imageRepository.GetByIdAsync(id);
        }

        public async Task<IEnumerable<Image>> GetImagesByAlbumIdAsync(int albumId)
        {
            return await _imageRepository.GetByAlbumIdAsync(albumId);
        }

        public async Task AddImageAsync(Image image)
        {
            await _imageRepository.AddAsync(image);
        }

        public async Task UpdateImageAsync(Image image)
        {
            await _imageRepository.UpdateAsync(image);
        }

        public async Task DeleteImageAsync(int id)
        {
            await _imageRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Image>> SearchImagesAsync(int albumId, string searchTerm)
        {
            return await _imageRepository.SearchAsync(albumId, searchTerm);
        }

    }
}

