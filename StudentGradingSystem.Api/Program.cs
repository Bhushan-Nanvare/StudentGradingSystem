using Microsoft.EntityFrameworkCore;
using StudentGradingSystem.Api.Data;
using StudentGradingSystem.Api.Repositories;
using StudentGradingSystem.Api.Services;

var builder = WebApplication.CreateBuilder(args);


// Register services
builder.Services.AddScoped<StudentRepository>();
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddScoped<StudentService>();



builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Enable Controllers
app.MapControllers();

app.Run();