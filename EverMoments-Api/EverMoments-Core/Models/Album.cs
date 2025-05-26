using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace EverMoments_Core.Models
{
    public class Album : BaseEntity
    {
        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        public string? Description { get; set; }

        public int UserId { get; set; }  // קשר ל-User
        public User? User { get; set; }

        public List<Image>? Images { get; set; } = new List<Image>();
    }
}
