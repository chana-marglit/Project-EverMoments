using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Models
{
    public class Image : BaseEntity
    {
       [Required]
public int UserId { get; set; }
public User? UploadedBy { get; set; }

public int? AlbumId { get; set; }  
public Album? Album { get; set; }
public string FileName { get; set; }

//[Required]
//[MaxLength(255)]
public string FileUrl { get; set; } = string.Empty;

[Required]
[MaxLength(20)]
public string FileType { get; set; } = string.Empty;

public string? Tags { get; set; }
public long FileSize { get; set; }
public string S3Key { get; set; } = string.Empty;
public DateTime UploadedAt { get; set; }

public ICollection<UserImageShare> SharedWithUsers { get; set; } = new List<UserImageShare>();
    }
}
