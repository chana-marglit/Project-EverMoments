using Google.Cloud.Vision.V1;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Service
{
    public class ImageTaggingService
    {
        private readonly ILogger<ImageTaggingService> _logger;

        public ImageTaggingService(ILogger<ImageTaggingService> logger)
        {
            _logger = logger;
        }

        public async Task<List<string>> GetImageLabelsFromVisionApi(string imageUrl)
        {
            var client = await ImageAnnotatorClient.CreateAsync();
            var image = Image.FromUri(imageUrl);
            var response = await client.DetectLabelsAsync(image);

            return response.Select(label => label.Description).ToList();
        }
    }
}
