using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using Microsoft.AspNetCore.Mvc;

namespace EverMoments_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : Controller
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userService.GetUsersAsync();
            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound($"משתמש עם מזהה {id} לא נמצא.");

            return Ok(user);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            if (user == null)
                return BadRequest("פרטי משתמש לא תקינים.");

            var createdUser = await _userService.CreateUserAsync(user);
            return CreatedAtAction(nameof(GetUser), new { id = createdUser.Id }, createdUser);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User user)
        {
            if (id != user.Id)
                return BadRequest("מזהה המשתמש לא תואם.");

            user.UpdatedAt = DateTime.UtcNow; 

            var updated = await _userService.UpdateUserAsync(user);
            return updated ? NoContent() : NotFound($"משתמש עם מזהה {id} לא נמצא.");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _userService.DeleteUserAsync(id);
            return deleted ? NoContent() : NotFound($"משתמש עם מזהה {id} לא נמצא.");
        }
    }
}
