using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pet_sitter_api.Entities;

namespace pet_sitter_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PhotoController : ControllerBase
{
    private readonly ILogger<PhotoController> _logger;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public PhotoController(ILogger<PhotoController> logger, IConfiguration configuration, ApplicationDbContext context)
    {
        _logger = logger;
        _configuration = configuration;
        _context = context;
    }

    [HttpGet("Get/{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
        try
        {
            var photo = _context.Photos.FirstOrDefault(n => n.PhotoId == id);
            if (photo == null)
            {
                return NotFound();
            }

            return Ok(photo);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "GetById");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("GetPhotos")]
    public async Task<IActionResult> GetPhotos()
    {
        try
        {
            var history = await _context.Photos
                .Take(10).ToListAsync();
            return Ok(history);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "GetPhotos");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost(Name = "PostPhoto")]
    public IActionResult PostPhoto([FromBody] Photo Photo)
    {
        try
        {
            _context.Photos.Add(Photo);
            _context.SaveChanges();
            return Ok(Photo);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "GetPhotos");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
