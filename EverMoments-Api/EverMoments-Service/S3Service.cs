using Amazon.S3;
using Amazon.S3.Model;
using Amazon.S3.Transfer;
using EverMoments_Core.Interfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace EverMoments_Service
{
    public class S3Service : IS3Service
    {
            private readonly IAmazonS3 _s3Client;
            private readonly string _bucketName = "image-testpnoren"; // ✅ עדכני את שם הדלי שלך

            public S3Service(IAmazonS3 s3Client)
            {
                _s3Client = s3Client;
            }

            public async Task<string> UploadFileAsync(IFormFile file)
            {
                if (file == null || file.Length == 0)
                    throw new ArgumentException("File is empty or null");

                using var memoryStream = new MemoryStream();
                await file.CopyToAsync(memoryStream);

                var uploadRequest = new PutObjectRequest
                {
                    BucketName = _bucketName,
                    Key = file.FileName,
                    InputStream = memoryStream,
                    ContentType = file.ContentType
                };

                await _s3Client.PutObjectAsync(uploadRequest);
                return $"https://{_bucketName}.s3.amazonaws.com/{file.FileName}";
            }
        // ✅ מחיקת קובץ מ-S3
        public async Task DeleteFileAsync(string fileUrl)
        {
            var key = fileUrl.Split($"{_bucketName}.s3.amazonaws.com/")[1];

            var deleteObjectRequest = new DeleteObjectRequest
            {
                BucketName = _bucketName,
                Key = key
            };

            await _s3Client.DeleteObjectAsync(deleteObjectRequest);
        }
        public string GeneratePreSignedURL(string fileName, string contentType, int expireMinutes = 15)
        {
            var request = new GetPreSignedUrlRequest
            {
                BucketName = _bucketName,
                Key = fileName,
                Verb = HttpVerb.PUT,
                Expires = DateTime.UtcNow.AddMinutes(expireMinutes),
                ContentType = contentType
            };

            return _s3Client.GetPreSignedURL(request);
        }
    }
}


   

