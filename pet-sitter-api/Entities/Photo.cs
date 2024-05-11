using System.ComponentModel.DataAnnotations.Schema;

namespace pet_sitter_api.Entities;

[Table("Photo")]
public class Photo
{
    public int PhotoId { get; set; }

    public string? S3Key { get; set; }

    public bool isDelete { get; set; }
}