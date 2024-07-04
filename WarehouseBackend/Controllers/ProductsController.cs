using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ProductsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ProductsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("receive")]
    public async Task<ActionResult<Product>> ReceiveProduct(Product product)
    {
        product.Date = DateTime.Now;
        product.Operation = "Received";
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpPost("issue")]
    public async Task<ActionResult<Product>> IssueProduct(Product product)
    {
        product.Date = DateTime.Now;
        product.Operation = "Issued";
        _context.Products.Add(product);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
    {
        return await _context.Products.ToListAsync();
    }

    [HttpGet("history")]
    public async Task<ActionResult<IEnumerable<Product>>> GetHistory()
    {
        return await _context.Products.ToListAsync();
    }
}