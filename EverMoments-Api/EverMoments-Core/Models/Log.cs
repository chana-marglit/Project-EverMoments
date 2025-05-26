using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Models
{
    public class Log : BaseEntity
    {
        //[Required]
        public int UserId { get; set; }

        //[Required]
        //[MaxLength(100)]
        public string Action { get; set; } = string.Empty;

        public string? Description { get; set; }

        //[ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
