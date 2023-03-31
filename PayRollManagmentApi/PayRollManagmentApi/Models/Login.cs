using System.ComponentModel.DataAnnotations;

namespace PayRollManagmentApi.Models
{
    public class Login
    {
        [Key]
        public int id { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

        public bool NewPassword { get; set; } = false;
    }
}
