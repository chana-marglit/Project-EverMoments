using EverMoments_Core.Interfaces;
using EverMoments_Core.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class AuthController : Controller
{
    private readonly IAuthService _authService; 

    public AuthController(IAuthService authService) 
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] AuthRequest request)
    {
        var result = await _authService.AuthenticateAsync(request);
        if (result == null)
            return Unauthorized("Invalid credentials.");

        return Ok(result); // עכשיו מחזיר גם token וגם fullName
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] EverMoments_Core.Models.RegisterRequest request)
    {
        var result = await _authService.RegisterAsync(request);
        if (result == null)
            return BadRequest("User already exists.");

        return Ok(result);
    }


}

