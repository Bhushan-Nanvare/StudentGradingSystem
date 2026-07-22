namespace StudentGradingSystem.Api.DTOs.Dashboard;

public class MarksStatsDto
{
    public int TotalMarksEntries { get; set; }

    public double AverageMarks { get; set; }

    public double HighestMarks { get; set; }

    public double LowestMarks { get; set; }
}
