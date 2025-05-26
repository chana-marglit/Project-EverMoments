using System.ComponentModel.DataAnnotations;

namespace EverMoments_Core.Models
{
    public class RegisterRequest
    {
       
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        //[Required]
        //[EmailAddress]
        public string Email { get; set; } = string.Empty;

        //[Required]
        //[DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }
}
