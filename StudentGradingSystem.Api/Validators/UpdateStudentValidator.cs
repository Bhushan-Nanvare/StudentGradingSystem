using FluentValidation;
using StudentGradingSystem.Api.DTOs;

namespace StudentGradingSystem.Api.Validators;

public class UpdateStudentValidator : AbstractValidator<UpdateStudentDto>
{
    public UpdateStudentValidator()
    {
        RuleFor(student => student.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(student => student.Age)
            .InclusiveBetween(16, 100);

        RuleFor(student => student.DepartmentId)
            .GreaterThan(0)
            .WithMessage("Please select a valid department.");

        RuleFor(student => student.CGPA)
            .InclusiveBetween(0, 10);

        RuleFor(student => student.RollNumber)
            .NotEmpty();

        RuleFor(student => student.Email)
            .NotEmpty()
            .EmailAddress();
    }
}
