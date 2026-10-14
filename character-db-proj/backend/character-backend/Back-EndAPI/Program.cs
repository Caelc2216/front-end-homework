using Back_EndAPI.Data;
using Back_EndAPI.Services;
using ClassLibrary.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using System.Text;

// LOAD .env (searches up parent folders until it finds one)
DotNetEnv.Env.TraversePath().Load();

var builder = WebApplication.CreateBuilder(args);
var connectionString = Environment.GetEnvironmentVariable("Postgres_Connection_String")
    ?? throw new InvalidOperationException("Postgres_Connection_String is not set in .env");
var key = "THIS_IS_MY_SECRET_KEY_1234567890";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false,
        ValidateAudience = false,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key))
    };
});


// ============================================================
// CHANGED FROM THIS:
// ============================================================
//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("Create", policy =>
//        policy.RequireClaim("permission", "users.create"));
//});

// TO THIS:
builder.Services.AddSingleton<IAuthorizationPolicyProvider, PermissionPolicyProvider>();



builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("bearer", new OpenApiSecurityScheme
    {
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Description = "JWT Authorization header using the Bearer scheme."
    });
    options.AddSecurityRequirement(document => new OpenApiSecurityRequirement
    {
        [new OpenApiSecuritySchemeReference("bearer", document)] = new List<string>()
    });
});

//NON React
//builder.Services.AddCors(options =>
//{
//    options.AddDefaultPolicy(policy =>
//        policy.AllowAnyOrigin()
//              .AllowAnyHeader()
//              .AllowAnyMethod());
//});
//WITH React
builder.Services.AddCors(options =>
{
    options.AddPolicy("ReactApp", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// REGISTER EF CORE
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

// REGISTER YOUR HERO SERVICE
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<CharacterService>();

var app = builder.Build();

// TEMP DB TEST (optional)
using (var conn = new Npgsql.NpgsqlConnection(connectionString))
{
    conn.Open();
    Console.WriteLine("Connected to Postgres!");
}

//NON React
//app.UseCors();
//WITH React
app.UseCors("ReactApp");

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty;  // <-- makes Swagger open at root "/"
    });
}

app.UseHttpsRedirection();
app.UseAuthentication(); //must be before !!!
app.UseAuthorization();
app.MapControllers();
app.Run();
