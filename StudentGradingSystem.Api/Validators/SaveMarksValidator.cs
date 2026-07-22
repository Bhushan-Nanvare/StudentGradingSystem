using FluentValidation;
using StudentGradingSystem.Api.DTOs.Marks;

namespace StudentGradingSystem.Api.Validators;

public class SaveMarksValidator : AbstractValidator<SaveMarksDto>
{
    public SaveMarksValidator()
    {
        RuleFor(x => x.SubjectId)
            .GreaterThan(0);

        RuleFor(x => x.AssessmentType)
            .NotEmpty();

        RuleFor(x => x.MaxMarks)
            .GreaterThan(0);

        RuleFor(x => x.Students)
            .NotEmpty()
            .WithMessage("At least one student is required.");
    }
}
