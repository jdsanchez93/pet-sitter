using System.ComponentModel.DataAnnotations.Schema;

namespace pet_sitter_api.Entities;

[Table("Note")]
public class Note
{
    public int NoteId { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }
}