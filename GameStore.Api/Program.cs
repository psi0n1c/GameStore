using GameStore.Api.Data;
using GameStore.Api.Endpoints;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddValidation();

builder.AddGameStoreDb();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins(
                "http://127.0.0.1:5500",
                "https://psi0n1c.github.io"
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        });
});


var app = builder.Build();

app.UseCors("AllowFrontend");

app.MapGamesEndpoints();

app.MapGenresEndpoints();

app.MigrateDb();

app.Run();