
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PayRollManagmentApi.Models
{
    public class Leave
    {
        [Key]
        public int LeaveId { get; set; }
        [Required]
        public int EId { get; set; }
        [Required]
        public DateTime FromDate { get; set; }
        [Required]
        public DateTime ToDate { get; set; }
        [Required]
        public int Days { get; set; }
        [Required]
        public string Reason { get; set; }

        public string status { get; set; } = "Pandding";
    }
}
