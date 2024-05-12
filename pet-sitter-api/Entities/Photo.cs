using System.ComponentModel.DataAnnotations.Schema;

namespace pet_sitter_api.Entities;

[Table("Photo")]
public class Photo
{
    public int PhotoId { get; set; }

    public string? S3Key { get; set; }

    public bool IsDelete { get; set; }

    //private navigation workaround for unidirectional many-to-many 
    private List<Note> Notes { get; set; } = new List<Note>();
}