using Grelka.Server.DbContexts;
using Grelka.Server.Models;
using Microsoft.EntityFrameworkCore;


namespace Grelka.Server.Repositories
{
    internal class PostgresOrderRepository : IRepository<Order>
    {
        private readonly AppDbContext db;
        private bool disposedValue;

        internal PostgresOrderRepository(AppDbContext context) { db = context; }

        public async Task<IEnumerable<Order>> GetList()
        {
            return await db.Orders.ToListAsync();
        }

        public async Task<Order> Get(Guid id)
        {
            var product = await db.Orders.Include(o => o.OrderItems).FirstOrDefaultAsync(p => p.Id == id);
            return product ?? throw new KeyNotFoundException($"Товар с id: {id} не найден.");
        }

        public async Task Create(Order order)
        {
            await db.Orders.AddAsync(order);
            await db.SaveChangesAsync();
        }

        public async Task Update(Order order)
        {
            db.Orders.Update(order);
            await db.SaveChangesAsync();
        }

        public async Task Delete(Guid id)
        {
            var product = await db.Orders.FindAsync(id);
            if (product != null)
            {
                db.Orders.Remove(product);
                await db.SaveChangesAsync();
            }
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                disposedValue = true;
            }
        }

        public void Dispose()
        {
            Dispose(disposing: true);
            GC.SuppressFinalize(this);
        }
    }
}
