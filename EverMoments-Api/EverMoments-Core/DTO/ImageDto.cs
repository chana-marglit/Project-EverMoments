// ﻿using System;
// using System.Collections.Generic;
// using System.ComponentModel.DataAnnotations;
// using System.Linq;
// using System.Text;
// using System.Threading.Tasks;

// namespace EverMoments_Core.DTO
// {
//     public class ImageDto
//     {
//         [Required]
//         public string FileName { get; set; } = string.Empty;

//         [Required]
//         [MaxLength(20)]
//         public string FileType { get; set; } = string.Empty;

//         [Required]
//         public long FileSize { get; set; }

//         [Required]
//         public string S3Key { get; set; } = string.Empty;

//         public int? AlbumId { get; set; } // אופציונלי – אם יש שיוך לאלבום

//         public int? UserId { get; set; } // אופציונלי – אם את רוצה לשמור מזהה משתמש

//         public string? Tags { get; set; } // תגיות אופציונליות (למשל: "טיול, משפחה")
//     }
// }
