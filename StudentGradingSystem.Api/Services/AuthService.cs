using StudentGradingSystem.Api.Authentication;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class AuthService : IAuthService
{
    private readonly IApplicationUserRepository _userRepository;
    private readonly JwtTokenGenerator _jwtTokenGenerator;

    public AuthService(
        IApplicationUserRepository userRepository,
        JwtTokenGenerator jwtTokenGenerator)
    {
        _userRepository = userRepository;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto?> Login(LoginDto dto)
    {
        var user = await _userRepository.GetByUsernameAsync(dto.Username);

        if (user == null)
        {
            return null;
        }

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
        {
            return null;
        }

        var accessToken = _jwtTokenGenerator.GenerateToken(user);

        var refreshToken = _jwtTokenGenerator.GenerateRefreshToken();

        await _userRepository.AddRefreshTokenAsync(new RefreshToken
        {
            Token = refreshToken,
            UserId = user.Id,
            ExpiresAt = DateTime.UtcNow.AddDays(7),
            IsRevoked = false
        });

        return new AuthResponseDto
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken,
            Username = user.Username,
            Role = user.Role
        };
    }



    public async Task<AuthResponseDto?> RefreshToken(RefreshTokenRequestDto dto)
    {
        var refreshToken = await _userRepository
            .GetValidRefreshTokenAsync(dto.RefreshToken);

        if (refreshToken == null)
        {
            return null;
        }

        if (refreshToken.ExpiresAt < DateTime.UtcNow)
        {
            return null;
        }

        var newAccessToken =
            _jwtTokenGenerator.GenerateToken(refreshToken.User);

        return new AuthResponseDto
        {
            AccessToken = newAccessToken,
            RefreshToken = refreshToken.Token,
            Username = refreshToken.User.Username,
            Role = refreshToken.User.Role
        };
    }
}