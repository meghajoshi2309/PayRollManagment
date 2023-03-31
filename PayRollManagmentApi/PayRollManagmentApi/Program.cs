using Microsoft.EntityFrameworkCore;
using PayRollManagmentApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContextPool<EmployeeContext>(opt => opt.UseSqlServer("server=(localdb)\\MSSQLLocalDB;database=EmployeeDb;Trusted_Connection=True;"));
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.UseCors(e => e
.AllowAnyHeader()
.AllowAnyOrigin()
.AllowAnyMethod()
);

app.Run();
