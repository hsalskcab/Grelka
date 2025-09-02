using Grelka.Server.DbContexts;
using Grelka.Server.Models;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.EntityFrameworkCore;


namespace Grelka.Server.Repositories
{
    internal class PostgresUserRepository: IRepository<User>
    {
        private readonly AppDbContext db;
        private bool disposedValue;

        internal PostgresUserRepository(AppDbContext context) { db = context; }
        public async Task<IEnumerable<User>> GetList()
        {
            return await db.Users.ToListAsync();
        }
        public async Task<User> Get(Guid id)
        {
            var user = await db.Users.FindAsync(id);
            return user ?? throw new KeyNotFoundException($"Пользователь с id: {id} ненайден.");
        }
        public async Task Create(User user)
        {
            await db.Users.AddAsync(user);  
            await db.SaveChangesAsync();
        }
        public async Task Update(User user)
        {
            db.Users.Update(user);
            await db.SaveChangesAsync();
        }
        public async Task Delete(Guid id)
        {
            var user = await db.Users.FindAsync(id);
            if (user != null)
            {
                db.Users.Remove(user);
                await db.SaveChangesAsync();
            }
        }
        public async Task<User> LoginAsync(string email, string password)
        {
            var user = await db.Users.Where(p => p.Email == email && p.Password == password).FirstOrDefaultAsync();
            return user ?? throw new KeyNotFoundException("Password incorrect or user does not exist");
        }
        public async Task<List<User>> FindSellersAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
            {
                throw new ArgumentException("Поисковый запрос не может быть пустым", nameof(searchTerm));
            }

            var users = await db.Users.Where(p => 
                p.UserType=="Seller" && 
                p.Username.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
                .ToListAsync();

            if (!users.Any())
            {
                throw new KeyNotFoundException($"Пользователей с именем '{searchTerm}' не найдено.");
            }

            return users;
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
