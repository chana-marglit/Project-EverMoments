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
<<<<<<< HEAD
        public int UserId { get; set; }
        public User? UploadedBy { get; set; }

        public int? AlbumId { get; set; }  
        public Album? Album { get; set; }
        public string FileName { get; set; }
=======
        public int UserId { get; set; }  // נדרש כדי ליצור קשר עם User
        public User? User { get; set; }  // אין צורך ב-[ForeignKey] כאן

        public int? AlbumId { get; set; }  // אפשרי שהוא יהיה null אם תמונה לא שייכת לאלבום
        public Album? Album { get; set; }
        public string FileName { get; set; }
        // הוספת שדה תגיות
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611

        //[Required]
        //[MaxLength(255)]
        public string FileUrl { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string FileType { get; set; } = string.Empty;

        public string? Tags { get; set; }
        public long FileSize { get; set; }
        public string S3Key { get; set; } = string.Empty;
<<<<<<< HEAD
        public DateTime UploadedAt { get; set; }

        public ICollection<UserImageShare> SharedWithUsers { get; set; } = new List<UserImageShare>();
=======
        public DateTime UploadedAt { get; set; } 

>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
}
