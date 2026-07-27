using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace StudentGradingSystem.Api.Extensions;

public static class PersistenceExtensions
{
    public static IServiceCollection AddPersistence(
        this IServiceCollection services,
        IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");
        
        Console.WriteLine($"[DEBUG] Raw Connection String Length: {connectionString?.Length ?? 0}");
        Console.WriteLine($"[DEBUG] Raw StartsWith postgres://: {connectionString?.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase)}");
        Console.WriteLine($"[DEBUG] Raw First 10 Chars: {(connectionString?.Length >= 10 ? connectionString.Substring(0, 10) : connectionString)}");

        // Render provides a postgres:// URL, Npgsql expects a standard ADO.NET string
        if (!string.IsNullOrWhiteSpace(connectionString))
        {
            var original = connectionString;
            connectionString = connectionString.Trim().Trim('"', '\'');
            
            if (connectionString.StartsWith("postgres://", StringComparison.OrdinalIgnoreCase) || 
                connectionString.StartsWith("postgresql://", StringComparison.OrdinalIgnoreCase))
            {
                Console.WriteLine("[DEBUG] Parsed Render URL successfully.");
                connectionString = BuildConnectionStringFromUrl(connectionString);
            }
            else if (original != connectionString)
            {
                Console.WriteLine("[DEBUG] Connection string was trimmed but didn't match postgres://");
            }
            else 
            {
                Console.WriteLine("[DEBUG] Connection string did not match postgres://. Using raw.");
            }
        }

        services.AddDbContext<AppDbContext>(options =>
        {
            options.UseNpgsql(connectionString);
        });

        return services;
    }

    private static string BuildConnectionStringFromUrl(string url)
    {
        var uri = new Uri(url);
        var userInfo = uri.UserInfo.Split(':');
        var password = userInfo.Length > 1 ? Uri.UnescapeDataString(userInfo[1]) : "";
        var username = Uri.UnescapeDataString(userInfo[0]);
        var port = uri.Port > 0 ? uri.Port : 5432;
        
        return $"Host={uri.Host};Port={port};Database={uri.LocalPath.TrimStart('/')};Username={username};Password={password};Ssl Mode=Require;Trust Server Certificate=true;";
    }
}