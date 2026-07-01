using StudentGradingSystem.Api.Repositories;
using StudentGradingSystem.Api.Services;

var builder = WebApplication.CreateBuilder(args);


// Register services
builder.Services.AddControllers();
builder.Services.AddOpenApi();
builder.Services.AddScoped<StudentService>();
builder.Services.AddScoped<StudentRepository>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

// Enable Controllers
app.MapControllers();

app.Run();