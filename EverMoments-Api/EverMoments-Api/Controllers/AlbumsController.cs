using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EverMoments_Api.Controllers
{
    
    [ApiController]
    [Route("api/albums")]
    public class AlbumsController : Controller
    {
        private readonly IAlbumService _albumService;

        public AlbumsController(IAlbumService albumService)
        {
            _albumService = albumService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAlbumById(int id)
        {
            var album = await _albumService.GetAlbumByIdAsync(id);

            if (album == null)
                return NotFound(new { message = $"אלבום עם מזהה {id} לא נמצא." });

            return Ok(album);
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<IEnumerable<Album>>> GetAlbumsByUserId(int userId)
        {
            var albums = await _albumService.GetAlbumsByUserIdAsync(userId);
            return Ok(albums);
        }

        [HttpPost]
        public async Task<ActionResult> CreateAlbum([FromBody] Album album)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // הוסף תאריך יצירה
            album.CreatedAt = DateTime.UtcNow;
            album.UpdatedAt = DateTime.UtcNow;

            try
            {
                await _albumService.AddAlbumAsync(album);
                return CreatedAtAction(nameof(GetAlbumById), new { id = album.Id }, album);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // החזר הודעת שגיאה אם המשתמש לא קיים
            }
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateAlbum(int id, [FromBody] Album album)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (id != album.Id)
                return BadRequest("ID mismatch.");

            await _albumService.UpdateAlbumAsync(album);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAlbum(int id)
        {
            await _albumService.DeleteAlbumAsync(id);
            return NoContent();
        }

       

    }
}
