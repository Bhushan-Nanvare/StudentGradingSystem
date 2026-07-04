using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using StudentGradingSystem.Api.Common;
namespace StudentGradingSystem.Api.Filters;

public class ValidationFilter<T> : IAsyncActionFilter
    where T : class
{
    private readonly IValidator<T> _validator;

    public ValidationFilter(IValidator<T> validator)
    {
        _validator = validator;
    }

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context,
        ActionExecutionDelegate next)
    {
        var dto = context.ActionArguments.Values
            .OfType<T>()
            .FirstOrDefault();

        if (dto == null)
        {
            await next();
            return;
        }

        ValidationResult validationResult =
            await _validator.ValidateAsync(dto);

        if (!validationResult.IsValid)
        {
           var errors = validationResult.Errors
    .GroupBy(x => x.PropertyName)
    .ToDictionary(
        g => g.Key,
        g => g.Select(x => x.ErrorMessage).ToArray());

context.Result = new BadRequestObjectResult(
    new ApiResponse<object>
    {
        Success = false,
        Message = "Validation failed.",
        Data = null,
        Errors = errors
    });

            return;
        }

        await next();
    }
}