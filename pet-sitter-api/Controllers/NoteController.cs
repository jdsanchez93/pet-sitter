using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pet_sitter_api.Entities;

namespace pet_sitter_api.Controllers;

[ApiController]
[Route("[controller]")]
public class NoteController : ControllerBase
{
    private static readonly string[] Summaries = new[]
    {
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    };

    private readonly ILogger<NoteController> _logger;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public const int MAX_RETRIES = 6;

    public NoteController(ILogger<NoteController> logger, IConfiguration configuration, ApplicationDbContext context)
    {
        _logger = logger;
        _configuration = configuration;
        _context = context;
    }

    [HttpGet(Name = "GetNotes")]
    public async Task<IActionResult> GetNotes()
    {
        try
        {
            var history = await _context.Notes
                .Take(10).ToListAsync();
            return Ok(history);
        }
        catch (System.Exception e)
        {

            _logger.LogError(e, "GetNotes");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpPost(Name = "PostNote")]
    public IActionResult PostNote([FromBody] Note note)
    {
        try
        {
            _context.Notes.Add(note);
            _context.SaveChanges();
            return Ok(note);
        }
        catch (System.Exception e)
        {

            _logger.LogError(e, "GetNotes");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
