using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Models
{
    public class BaseEntity
    {
        [Key]
<<<<<<< HEAD
=======
        //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
        public int Id { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime? UpdatedAt { get; set; }
    }
}
