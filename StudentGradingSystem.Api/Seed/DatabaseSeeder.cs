using StudentGradingSystem.Api.Data;

namespace StudentGradingSystem.Api.Seed;

public static class DatabaseSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        await UserSeeder.SeedAsync(context);
        await DepartmentSeeder.SeedAsync(context);
        await FacultySeeder.SeedAsync(context);
        await SubjectSeeder.SeedAsync(context);
        await StudentSeeder.SeedAsync(context);

        await StudentSubjectSeeder.SeedAsync(context);

        await StudentSeeder.SeedAsync(context);
        await StudentSubjectSeeder.SeedAsync(context);
    }
}