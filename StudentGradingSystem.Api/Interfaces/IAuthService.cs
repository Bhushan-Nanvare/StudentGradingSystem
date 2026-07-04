using StudentGradingSystem.Api.DTOs;

namespace StudentGradingSystem.Api.Interfaces;


public interface IAuthService
{
    Task<string?> Login(LoginDto dto);
}