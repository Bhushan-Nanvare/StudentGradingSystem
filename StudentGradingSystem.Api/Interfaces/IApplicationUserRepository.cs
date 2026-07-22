using StudentGradingSystem.Api.Models;

namespace StudentGradingSystem.Api.Interfaces;

public interface IApplicationUserRepository
{
    Task<ApplicationUser?> GetByUsernameAsync(string username);

    Task<bool> ExistsByUsernameAsync(string username);

    Task<bool> ExistsByEmailAsync(string email);

    Task<ApplicationUser> AddAsync(ApplicationUser user);

    Task<RefreshToken?> GetValidRefreshTokenAsync(string token);

    Task AddRefreshTokenAsync(RefreshToken refreshToken);

    Task SaveChangesAsync();
}
