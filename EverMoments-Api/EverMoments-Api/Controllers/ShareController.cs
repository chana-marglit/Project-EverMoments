using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EverMoments_Api.Controllers
{
    [ApiController]
    [Route("api/share")]
    [Authorize]
    public class ShareController : ControllerBase
    {
        private readonly IShareService _shareService;

        public ShareController(IShareService shareService)
        {
            _shareService = shareService;
        }

        [HttpPost("image/{imageId}")]
        public async Task<IActionResult> ShareImage(int imageId, [FromBody] ShareImageRequest request)
        {
            try
            {
                var userIdClaim = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var currentUserId))
                {
                    return Unauthorized("Invalid user token");
                }

                var success = await _shareService.ShareImageWithUsersAsync(imageId, currentUserId, request.UserIds);

                if (!success)
                {
                    return BadRequest("Failed to share image. Check if image exists and you have permission.");
                }

                return Ok(new { success = true, message = "Image shared successfully" });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpDelete("image/{imageId}/user/{userId}")]
        public async Task<IActionResult> UnshareImage(int imageId, int userId)
        {
            try
            {
                var success = await _shareService.UnshareImageAsync(imageId, userId);

                if (!success)
                {
                    return BadRequest("Failed to unshare image");
                }

                return Ok(new { success = true, message = "Image unshared successfully" });
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("my-shared-images")]
        public async Task<IActionResult> GetMySharedImages()
        {
            try
            {
                var userIdClaim = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userIdClaim) || !int.TryParse(userIdClaim, out var currentUserId))
                {
                    return Unauthorized("Invalid user token");
                }

                var sharedImages = await _shareService.GetSharedImagesAsync(currentUserId);
                return Ok(sharedImages);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("image/{imageId}/shares")]
        public async Task<IActionResult> GetImageShares(int imageId)
        {
            try
            {
                var shares = await _shareService.GetImageSharesAsync(imageId);
                return Ok(shares);
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class ShareImageRequest
    {
        public List<int> UserIds { get; set; } = new List<int>();
    }
}

