using Microsoft.AspNetCore.Mvc;
using StudentGradingSystem.Api.Common;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;

namespace StudentGradingSystem.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto dto)
    {
        var response = await _authService.Login(dto);

        if (response == null)
        {
            return Unauthorized(new ApiResponse<object>
            {
                Success = false,
                Message = "Invalid username or password.",
                Data = null,
                Errors = null
            });
        }

        return Ok(new ApiResponse<object>
        {
            Success = true,
            Message = "Login successful.",
            Data = response,
            Errors = null
        });
    }   

    [HttpPost("refresh")]
    public async Task<IActionResult> RefreshToken(RefreshTokenRequestDto dto)
    {
        var response = await _authService.RefreshToken(dto);

        if (response == null)
        {
            return Unauthorized(new ApiResponse<object>
            {
                Success = false,
                Message = "Invalid or expired refresh token.",
                Data = null,
                Errors = null
            });
        }

        return Ok(new ApiResponse<AuthResponseDto>
        {
            Success = true,
            Message = "Token refreshed successfully.",
            Data = response,
            Errors = null
        });
    }
}