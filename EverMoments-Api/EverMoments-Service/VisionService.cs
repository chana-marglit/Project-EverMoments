using Google.Cloud.Vision.V1;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EverMoments_Service
{
    public class VisionService
    {
        private readonly ImageAnnotatorClient _client;

        public VisionService()
        {
<<<<<<< HEAD
=======
            // ודאי שהגדרת את משתנה הסביבה GOOGLE_APPLICATION_CREDENTIALS
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
            _client = ImageAnnotatorClient.Create();
        }

        public async Task<List<string>> DetectLabelsAsync(string imageUrl)
        {
            var image = Image.FetchFromUri(imageUrl);
            var result = await _client.DetectLabelsAsync(image);

            return result
                .Where(label => label.Score > 0.6)
                .Select(label => label.Description)
                .ToList();
        }
    }
}
