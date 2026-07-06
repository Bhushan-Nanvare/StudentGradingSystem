using FluentValidation;
using StudentGradingSystem.Api.DTOs;

namespace StudentGradingSystem.Api.Validators;

public class CreateDepartmentValidator
    : AbstractValidator<CreateDepartmentDto>
{
    public CreateDepartmentValidator()
    {
        RuleFor(x => x.DepartmentCode)
            .NotEmpty()
            .MaximumLength(20);

        RuleFor(x => x.Name)
            .NotEmpty()
            .MaximumLength(100);
    }
}