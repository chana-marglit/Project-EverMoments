using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Interfaces
{
    public interface IS3Service
    {
       Task<string> UploadFileAsync(IFormFile file);
       Task DeleteFileAsync(string fileUrl);
       string GeneratePreSignedURL(string fileName, string contentType, int expireMinutes=15);
    }
}
