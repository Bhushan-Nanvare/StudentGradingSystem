using Microsoft.AspNetCore.Http;

namespace StudentGradingSystem.Api.Exceptions;

public class DuplicateSubjectCodeException : AppException
{
    public DuplicateSubjectCodeException(string subjectCode)
        : base(
            $"Subject code '{subjectCode}' already exists.",
            StatusCodes.Status409Conflict)
    {
    }
}