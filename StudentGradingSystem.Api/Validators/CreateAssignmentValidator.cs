using FluentValidation;
using StudentGradingSystem.Api.DTOs.Assignment;

namespace StudentGradingSystem.Api.Validators;

public class CreateAssignmentValidator
    : AbstractValidator<CreateAssignmentDto>
{
    public CreateAssignmentValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .MaximumLength(200);

        RuleFor(x => x.Description)
            .MaximumLength(1000);

        RuleFor(x => x.SubjectId)
            .GreaterThan(0);

        RuleFor(x => x.MaxMarks)
            .InclusiveBetween(1, 1000);
    }
}
