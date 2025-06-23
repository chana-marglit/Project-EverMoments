using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Models
{
    public class UserImageShare
    {
        public int Id { get; set; }

        public int ImageId { get; set; }
        public Image Image { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public DateTime SharedAt { get; set; } = DateTime.UtcNow;
    }
}
