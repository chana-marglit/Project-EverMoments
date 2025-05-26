using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace EverMoments_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LogsController : ControllerBase
    {
        private readonly ILogService _logService;

        public LogsController(ILogService logService)
        {
            _logService = logService;
        }

        // שליפת לוגים לפי משתמש (דורש הרשאה)
        [HttpGet("user/{userId}")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> GetLogsByUser(int userId)
        {
            var logs = await _logService.GetLogsByUserIdAsync(userId);
            if (!logs.Any())
                return NotFound("לא נמצאו פעולות עבור המשתמש.");
            return Ok(logs);
        }

        // הוספת לוג באופן ידני (לדוגמה: דוח אבחון)
        [HttpPost("add")]
        [Authorize(Roles = "admin")]
        public async Task<IActionResult> AddLog([FromBody] Log log)
        {
            await _logService.AddLogAsync(log.UserId, log.Action, log.Description);
            return Ok("הפעולה נרשמה ביומן בהצלחה.");
        }
    }
}
