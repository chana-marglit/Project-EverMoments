using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.DTOs
{
    public class SystemStatsDto
    {
        public int TotalUsers { get; set; }
        public int TotalAlbums { get; set; }
        public int TotalImages { get; set; }
        public long TotalStorage { get; set; }
        public int NewUsersToday { get; set; }
        public int NewImagesThisWeek { get; set; }
    }
}
