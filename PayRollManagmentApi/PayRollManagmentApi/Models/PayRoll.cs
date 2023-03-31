using System.ComponentModel.DataAnnotations;

namespace PayRollManagmentApi.Models
{
    public class PayRoll
    {
        [Key]
        public int PayRollId { get; set; }

        [Required]
        public int EId { get; set; }

        public int NoOfLeaveInThisMonth { get; set; }

        [Required]
        public int MonthlySalary { get; set; }

        [Required]
        public int YearlySalary { get; set; }
        public int? CashInAdvance { get; set; }

        [Required]
        public double Tex { get; set; }

        [Required]
        public double NetPayment { get; set; }

        public string monthOfPayroll { get; set; }
    }
}
