using Microsoft.EntityFrameworkCore;

namespace PayRollManagmentApi.Models
{
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options) { }


        //entities
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Leave> Leaves { get; set; }
        public DbSet<PayRoll> PayRolls { get; set; }
        public DbSet<Login> Logins { get; set; }
    }
}
