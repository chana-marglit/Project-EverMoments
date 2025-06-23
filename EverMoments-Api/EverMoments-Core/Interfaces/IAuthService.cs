using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EverMoments_Core.Interfaces
{
    public interface IAuthService
    {
        Task<AuthResponse?> AuthenticateAsync(AuthRequest request);
        Task<AuthResponse?> RegisterAsync(RegisterRequest request);
    }
}
