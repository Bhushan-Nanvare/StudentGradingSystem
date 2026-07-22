using FluentValidation;
using StudentGradingSystem.Api.DTOs;

namespace StudentGradingSystem.Api.Validators;

public class UpdateSubjectValidator : AbstractValidator<UpdateSubjectDto>
{
    public UpdateSubjectValidator()
    {
        RuleFor(subject => subject.SubjectCode)
            .NotEmpty()
            .MaximumLength(20);

        RuleFor(subject => subject.Name)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(subject => subject.Credits)
            .InclusiveBetween(1, 10);

        RuleFor(subject => subject.Semester)
            .InclusiveBetween(1, 8);
    }
}
