using FluentValidation;
using StudentGradingSystem.Api.DTOs;

namespace StudentGradingSystem.Api.Validators;

public class UpdateFacultyValidator
    : AbstractValidator<UpdateFacultyDto>
{
    public UpdateFacultyValidator()
    {
        RuleFor(x => x.EmployeeCode)
            .NotEmpty()
            .MaximumLength(20);

        RuleFor(x => x.FirstName)
            .NotEmpty();

        RuleFor(x => x.LastName)
            .NotEmpty();

        RuleFor(x => x.Email)
            .EmailAddress();

        RuleFor(x => x.DepartmentId)
            .GreaterThan(0);
    }
}