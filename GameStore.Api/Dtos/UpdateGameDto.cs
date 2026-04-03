using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace GameStore.Api.Dtos;

public record UpdateGameDto(
    [Required][StringLength(50)] string Name,
    [Range(0, 50)] int GenreId,
    [Range(0, 100)] decimal Price,
    DateOnly ReleaseDate
);
