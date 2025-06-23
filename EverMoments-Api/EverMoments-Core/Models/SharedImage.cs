using System;

namespace EverMoments_Core.Models
{
    public class SharedImage
    {
        public int Id { get; set; }
        public int ImageId { get; set; }
        public int SharedByUserId { get; set; }
        public int SharedWithUserId { get; set; }
        public DateTime SharedAt { get; set; }
        public bool IsActive { get; set; } = true;

        // Navigation properties
        public Image Image { get; set; }
        public User SharedByUser { get; set; }
        public User SharedWithUser { get; set; }
    }
}

