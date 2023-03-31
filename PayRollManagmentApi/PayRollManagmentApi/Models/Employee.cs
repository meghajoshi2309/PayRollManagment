using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayRollManagmentApi.Models
{
    public class Employee
    {
        [Key]
        public int EId { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string PhoneNo { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string Department { get; set; }
        [Required]
        public string Role { get; set; }
        [Required]
        public DateTime Dob { get; set; }
        [Required]
        public DateTime Doj { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string State { get; set; }

    }
}
