using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Authentication;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.DTOs;
using StudentGradingSystem.Api.Interfaces;
using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly JwtTokenGenerator _jwtTokenGenerator;

    public AuthService(
        AppDbContext context,
        JwtTokenGenerator jwtTokenGenerator)
    {
        _context = context;
        _jwtTokenGenerator = jwtTokenGenerator;
    }

    public async Task<AuthResponseDto?> Login(LoginDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Username == dto.Username);

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

        _context.RefreshTokens.Add(new RefreshToken
    {
        Token = refreshToken,
        UserId = user.Id,
        ExpiresAt = DateTime.UtcNow.AddDays(7),
         IsRevoked = false
    });

        await _context.SaveChangesAsync();

        return new AuthResponseDto
    {
        AccessToken = accessToken,
        RefreshToken = refreshToken
    };
    }



    public async Task<AuthResponseDto?> RefreshToken(RefreshTokenRequestDto dto)
{
    var refreshToken = await _context.RefreshTokens
        .Include(r => r.User)
        .FirstOrDefaultAsync(r =>
            r.Token == dto.RefreshToken &&
            !r.IsRevoked);

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
        RefreshToken = refreshToken.Token
    };
}
}