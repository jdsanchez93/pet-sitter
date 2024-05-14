using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using pet_sitter_api.Entities;

namespace pet_sitter_api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NoteController : ControllerBase
{
    private readonly ILogger<NoteController> _logger;
    private readonly IConfiguration _configuration;
    private readonly ApplicationDbContext _context;

    public NoteController(ILogger<NoteController> logger, IConfiguration configuration, ApplicationDbContext context)
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
            var note = _context.Notes.FirstOrDefault(n => n.NoteId == id);
            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "GetNotes");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }

    [HttpGet("GetNotes")]
    public async Task<IActionResult> GetNotes()
    {
        try
        {
            var history = await _context.Notes
                .Take(10).ToListAsync();
            return Ok(history);
        }
        catch (Exception e)
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
            note.NoteDate = DateTime.UtcNow;
            _context.Notes.Add(note);
            _context.SaveChanges();
            return Ok(note);
        }
        catch (Exception e)
        {
            _logger.LogError(e, "GetNotes");
            return StatusCode(StatusCodes.Status500InternalServerError);
        }
    }
}
