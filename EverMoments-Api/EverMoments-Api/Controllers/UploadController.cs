
using Microsoft.AspNetCore.Mvc;
using EverMoments_Service;
using EverMoments_Core.Interfaces;

namespace EverMoments_Api.Controllers
{
    [Route("api/upload")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IS3Service _s3Service;

        public UploadController(IS3Service s3Service)
        {
            _s3Service = s3Service;
        }

        [HttpGet("generate-url")]
        public IActionResult GenerateUploadUrl([FromQuery] string fileName, [FromQuery] string contentType)
        {
            if (string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(contentType))
                return BadRequest("Missing file name or content type");

            try
            {
                var cleanFileName = Path.GetFileName(fileName);
                var url = _s3Service.GeneratePreSignedURL(cleanFileName, contentType);
                return Ok(new { url, key = fileName });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error generating URL", error = ex.Message });
            }
        }
    }
}



 



