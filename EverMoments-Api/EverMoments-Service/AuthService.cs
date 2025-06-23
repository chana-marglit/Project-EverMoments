using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using EverMoments_Core.Models;
using EverMoments_Core.Interfaces;
using EverMoments_Core.Repositories;
using System.Security.Cryptography;

namespace EverMoments_Service
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;

        public AuthService(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
        }

        public async Task<AuthResponse?> AuthenticateAsync(AuthRequest request)
        {
            var user = await _userRepository.GetUserByEmailAsync(request.Email);

            if (user == null || !VerifyPassword(request.Password, user.Password, user.Salt))
                return null;

            return new AuthResponse
            {
                Token = GenerateJwtToken(user),
<<<<<<< HEAD
                FullName = $"{user.FirstName} {user.LastName}",
=======
                FullName = $"{user.FirstName} {user.LastName}"
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
            };
        }

       

        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
<<<<<<< HEAD
                new Claim(ClaimTypes.Role, user.Role),
                new Claim("id", user.Id.ToString())
=======
                new Claim(ClaimTypes.Role, user.Role)
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
            };

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(2),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private (string hash, string salt) HashPassword(string password)
        {
            // צור מלח חדש
            var salt = new byte[16];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }

            // קוד את הסיסמה עם המלח
            using (var pbkdf2 = new Rfc2898DeriveBytes(password, salt, 10000))
            {
                var hash = pbkdf2.GetBytes(20);
                // החזר את הקוד המוצפן עם המלח
                return (Convert.ToBase64String(hash), Convert.ToBase64String(salt));
            }
        }

        private bool VerifyPassword(string enteredPassword, string storedHash, string storedSalt)
        {
            var salt = Convert.FromBase64String(storedSalt);
            using (var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, 10000))
            {
                var hash = pbkdf2.GetBytes(20);
                return Convert.ToBase64String(hash) == storedHash; // השווה את הקודים
            }
        }
        public async Task<AuthResponse?> RegisterAsync(RegisterRequest request)
        {
            var existingUser = await _userRepository.GetUserByEmailAsync(request.Email);
            if (existingUser != null)
                return null;

            var (hashedPassword, salt) = HashPassword(request.Password);

            var newUser = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                Password = hashedPassword,
                Salt = salt,
                Role = "user"
            };

            await _userRepository.AddUserAsync(newUser);

            return new AuthResponse
            {
                Token = GenerateJwtToken(newUser),
                FullName = $"{newUser.FirstName} {newUser.LastName}"
            };
        }
<<<<<<< HEAD
        //public async Task<string?> RegisterAsync(RegisterRequest request)
        //{
        //    var existingUser = await _userManager.FindByEmailAsync(request.Email);
        //    if (existingUser != null)
        //        return null; // כבר קיים

        //    var user = new ApplicationUser
        //    {
        //        UserName = request.Email,
        //        Email = request.Email,
        //        FirstName = request.FirstName,
        //        LastName = request.LastName
        //    };

        //    var result = await _userManager.CreateAsync(user, request.Password);
        //    if (!result.Succeeded)
        //        return null;

        //    // הוספת תפקיד
        //    await _userManager.AddToRoleAsync(user, request.Role ?? "user");

        //    // הפקת טוקן מיידית
        //    return await GenerateJwtToken(user);
        //}

=======
       
>>>>>>> fb84175d8ee8c740d20b5bbc67b3803ead778611
    }
}
