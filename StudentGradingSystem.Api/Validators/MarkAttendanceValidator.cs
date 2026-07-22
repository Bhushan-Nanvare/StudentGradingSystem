using FluentValidation;
using StudentGradingSystem.Api.DTOs.Attendance;

namespace StudentGradingSystem.Api.Validators;

public class MarkAttendanceValidator
    : AbstractValidator<MarkAttendanceDto>
{
    public MarkAttendanceValidator()
    {
        RuleFor(x => x.SubjectId)
            .GreaterThan(0);

        RuleFor(x => x.Date)
            .NotEmpty()
            .WithMessage("Attendance date is required.");

        RuleFor(x => x.Students)
            .NotEmpty()
            .WithMessage("At least one student is required.");
    }
}
