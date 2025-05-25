using Grelka.Server.DbContexts;
using Grelka.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;

namespace Grelka.Server.Repositories
{
    internal class PostgresProductRepository : IRepository<Product>
    {
        private readonly AppDbContext _db;
        private bool disposedValue;

        internal PostgresProductRepository(AppDbContext context) { _db = context; }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _db.Products.ToListAsync<Product>();
        }

        public async Task<Product> Get(Guid id)
        {
            return await _db.Products.FindAsync(id);
        }

        public async Task Create(Product product)
        {
            
        }

        public async Task Update(Product product)
        {
            
        }

        public async Task Delete(Guid id)
        {
            
        }
        protected virtual void Dispose(bool disposing)
        {
            if (!disposedValue)
            {
                if (disposing)
                {
                    _db.Dispose();
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
