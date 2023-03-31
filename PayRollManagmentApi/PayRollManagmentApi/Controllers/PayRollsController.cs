using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PayRollManagmentApi.Models;

namespace PayRollManagmentApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayRollsController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public PayRollsController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/PayRolls
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PayRoll>>> GetPayRolls()
        {
          if (_context.PayRolls == null)
          {
              return NotFound();
          }
            return await _context.PayRolls.ToListAsync();
        }

        // GET: api/PayRolls/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PayRoll>> GetPayRoll(int id)
        {
          if (_context.PayRolls == null)
          {
              return NotFound();
          }
            var payRoll = await _context.PayRolls.FindAsync(id);

            if (payRoll == null)
            {
                return NotFound();
            }

            return payRoll;
        }

        // PUT: api/PayRolls/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPayRoll(int id, PayRoll payRoll)
        {
            if (id != payRoll.PayRollId)
            {
                return BadRequest();
            }

            _context.Entry(payRoll).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PayRollExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/PayRolls
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PayRoll>> PostPayRoll(PayRoll payRoll)
        {
          if (_context.PayRolls == null)
          {
              return Problem("Entity set 'EmployeeContext.PayRolls'  is null.");
          }
            _context.PayRolls.Add(payRoll);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPayRoll", new { id = payRoll.PayRollId }, payRoll);
        }

        // DELETE: api/PayRolls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePayRoll(int id)
        {
            if (_context.PayRolls == null)
            {
                return NotFound();
            }
            var payRoll = await _context.PayRolls.FindAsync(id);
            if (payRoll == null)
            {
                return NotFound();
            }

            _context.PayRolls.Remove(payRoll);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PayRollExists(int id)
        {
            return (_context.PayRolls?.Any(e => e.PayRollId == id)).GetValueOrDefault();
        }
    }
}
