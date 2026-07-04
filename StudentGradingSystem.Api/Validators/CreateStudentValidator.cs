using FluentValidation;
using StudentGradingSystem.Api.DTOs;

namespace StudentGradingSystem.Api.Validators;

public class CreateStudentValidator : AbstractValidator<CreateStudentDto>
{
    public CreateStudentValidator()
    {
        RuleFor(student => student.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(student => student.Age)
            .InclusiveBetween(16, 100);

        RuleFor(student => student.Department)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(student => student.CGPA)
            .InclusiveBetween(0, 10);
    }
}