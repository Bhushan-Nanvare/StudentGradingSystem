using StudentGradingSystem.Api.DTOs;

namespace StudentGradingSystem.Api.Interfaces;


public interface IAuthService
{
    Task<AuthResponseDto?> Login(LoginDto dto);
    Task<AuthResponseDto?> RefreshToken(RefreshTokenRequestDto dto);
}