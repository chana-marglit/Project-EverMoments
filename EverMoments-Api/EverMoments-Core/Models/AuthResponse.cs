using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Models
{
    
        public class AuthResponse
        {
            public string Token { get; set; } = null!;
            public string FullName { get; set; } = null!;
        }
    
}
