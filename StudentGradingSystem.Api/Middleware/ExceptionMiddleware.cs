using System.Text.Json;
using Microsoft.Extensions.Logging;
using StudentGradingSystem.Api.Exceptions;
using StudentGradingSystem.Api.Common;
namespace StudentGradingSystem.Api.Middleware;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionMiddleware> _logger;

    public ExceptionMiddleware(
        RequestDelegate next,
        ILogger<ExceptionMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (AppException ex)
        {
            _logger.LogWarning(
                ex,
                "Business exception occurred: {Message}",
                ex.Message);

            context.Response.StatusCode = ex.StatusCode;
            context.Response.ContentType = "application/json";

            var response = new ApiResponse<object>
                {
                    Success = false,
                    Message = ex.Message,
                    Data = null,
                    Errors = null
                };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response));
        }
        catch (Exception ex)
        {
            _logger.LogError(
                ex,
                "An unexpected exception occurred.");

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/json";

                var response = new ApiResponse<object>
                {
                    Success = false,
                    Message = "An unexpected error occurred.",
                    Data = null,
                    Errors = null
                };

            await context.Response.WriteAsync(
                JsonSerializer.Serialize(response));
        }
    }
}