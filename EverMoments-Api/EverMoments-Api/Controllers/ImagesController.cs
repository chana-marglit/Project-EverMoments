using EverMoments_Core.DTO;
using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using EverMoments_Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EverMoments_Api.Controllers
{
    [ApiController]
    [Route("api/images")]  // השארת הנתיב כפי שהוא
    public class ImagesController : ControllerBase
    {
        private readonly IImageService _imageService;
        private readonly IS3Service _s3Service;
        private readonly VisionService _visionService;

        public ImagesController(IImageService imageService, IS3Service s3Service, VisionService visionService)
        {
            _imageService = imageService;
            _s3Service = s3Service;
            _visionService = visionService;
        }

        // ✅ שליפת תמונה לפי מזהה
        [HttpGet("{id}")]
        public async Task<ActionResult<Image>> GetImageById(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            return image == null ? NotFound() : Ok(image);
        }

        // ✅ שליפת כל התמונות של אלבום
        [HttpGet("album/{albumId}")]
        public async Task<ActionResult<IEnumerable<Image>>> GetImagesByAlbumId(int albumId)
        {
            var images = await _imageService.GetImagesByAlbumIdAsync(albumId);
            return Ok(images);
        }

        // הוספת נקודת קצה חדשה שתואמת את הקריאה מהצד לקוח
        [HttpPost("save")]
        public async Task<IActionResult> SaveImage([FromBody] Image image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            image.CreatedAt = DateTime.UtcNow;
            await _imageService.AddImageAsync(image);
            return Ok(new { message = "התמונה נשמרה בהצלחה!", image });
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] int albumId)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("קובץ התמונה חסר או ריק.");
            }

            var fileUrl = await _s3Service.UploadFileAsync(file);
            var labels = await _visionService.DetectLabelsAsync(fileUrl); // ← מוסיפים את השירות
            var image = new Image
            {
                FileUrl = fileUrl,
                FileName = file.FileName,  // הוספת שם הקובץ
                FileType = Path.GetExtension(file.FileName),
                AlbumId = albumId,
                CreatedAt = DateTime.UtcNow
            };

            await _imageService.AddImageAsync(image);
            return Ok(new { message = "התמונה הועלתה בהצלחה!", image });
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Image>>> SearchImages([FromQuery] int albumId, [FromQuery] string searchTerm)
        {
            if (albumId <= 0)
            {
                return BadRequest("מזהה אלבום חייב להיות חיובי");
            }

            var images = await _imageService.SearchImagesAsync(albumId, searchTerm);
            return Ok(images);
        }

        [HttpPost("save-metadata")]
        public async Task<IActionResult> SaveImageMetadata([FromBody] ImageDto dto)
        {
            var image = new Image
            {
                FileName = dto.FileName,
                FileType = dto.FileType,
                FileSize = dto.FileSize,
                S3Key = dto.S3Key,
                AlbumId = dto.AlbumId,
                UserId = dto.UserId.Value,
                Tags = dto.Tags,
                UploadedAt = DateTime.UtcNow,
                FileUrl = $"https://image-testpnoren.s3.amazonaws.com/{dto.S3Key}"
            };

            await _imageService.AddImageAsync(image);
            return Ok(image);
        }

        [HttpPut("{id}/tags")]
        public async Task<IActionResult> UpdateImageTags(int id, [FromBody] string tags)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null) return NotFound();

            image.Tags = tags;
            await _imageService.UpdateImageAsync(image);

            return Ok(new { message = "תגיות התמונה עודכנו בהצלחה", image });
        }

        // ✅ מחיקת תמונה מה-S3 ומה-DB
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteImage(int id)
        {
            var image = await _imageService.GetImageByIdAsync(id);
            if (image == null) return NotFound();

            try
            {
                await _s3Service.DeleteFileAsync(image.FileUrl);
            }
            catch (Exception ex)
            {
                // לוג השגיאה אבל להמשיך למחוק מהמסד נתונים
                Console.WriteLine($"שגיאה במחיקת קובץ מ-S3: {ex.Message}");
            }

            await _imageService.DeleteImageAsync(id);
            return NoContent();
        }
    }
}

//using EverMoments_Core.Interfaces;
//using EverMoments_Core.Models;
//using Microsoft.AspNetCore.Mvc;

//namespace EverMoments_Api.Controllers
//{
//    [ApiController]
//    [Route("api/image")]
//    public class ImageController : ControllerBase
//    {
//        private readonly IImageService _imageService;

//        public ImageController(IImageService imageService)
//        {
//            _imageService = imageService;
//        }

//        [HttpGet("album/{albumId}")]
//        public async Task<ActionResult<IEnumerable<Image>>> GetImagesByAlbumId(int albumId)
//        {
//            var images = await _imageService.GetImagesByAlbumIdAsync(albumId);
//            return Ok(images);
//        }

//        [HttpPost("save")]
//        public async Task<ActionResult> SaveImage([FromBody] Image image)
//        {
//            if (!ModelState.IsValid)
//                return BadRequest(ModelState);

//            await _imageService.AddImageAsync(image);
//            return CreatedAtAction(nameof(GetImagesByAlbumId), new { albumId = image.AlbumId }, image);
//        }

//        [HttpDelete("{id}")]
//        public async Task<ActionResult> DeleteImage(int id)
//        {
//            await _imageService.DeleteImageAsync(id);
//            return NoContent();
//        }
//    }
//}
