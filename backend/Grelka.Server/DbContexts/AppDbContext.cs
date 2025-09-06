using Grelka.Server.DbContexts;
using Grelka.Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.ComponentModel;


public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
        optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=Zavodnoi11.");

        return new AppDbContext(optionsBuilder.Options);
    }
}

namespace Grelka.Server.DbContexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }


        //public object Products { get; internal set; }

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=postgres;Username=postgres;Password=ktoktokto");
        //}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            ConfigureProductModel(modelBuilder);
            ConfigureUserModel(modelBuilder);
            ConfigureOrderModel(modelBuilder);

            base.OnModelCreating(modelBuilder);
        }
        private void ConfigureProductModel(ModelBuilder modelBuilder) { 
            modelBuilder.Entity<Product>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Name)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(p => p.Brand)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(p => p.Description)
                    .HasMaxLength(500)
                    .IsRequired();

                entity.Property(p => p.Presence)
                    .HasMaxLength(10)
                    .IsRequired();

                entity.Property(p => p.Price)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                entity.Property(p => p.Sex)
                    .HasMaxLength(10)
                    .IsRequired();

                entity.Property(p => p.Images)
                    .IsRequired();

                entity.Property(p => p.SellerId)
                    .IsRequired();
            });
        }
        private void ConfigureOrderModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.OrderDate)
                    .IsRequired();

                entity.Property(p => p.TotalAmount)
                    .HasColumnType("decimal(18, 2)")
                    .IsRequired();

                entity.Property(p => p.CustomerId)
                    .IsRequired();

                entity.Property(p => p.SellerId)
                    .IsRequired();

                entity.Property(p => p.OrderedProductsId)
                    .IsRequired();
            });
        }
        private void ConfigureUserModel(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(p => p.Id);

                entity.Property(p => p.Email)
                    .HasMaxLength(100)
                    .IsRequired();

                entity.Property(p => p.Username)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(p => p.UserType)
                    .HasMaxLength(50)
                    .IsRequired();

                entity.Property(p => p.LikedProducts)
                    .IsRequired();

                entity.Property(p => p.Bdate)
                    .IsRequired();

                entity.Property(p => p.Icon)
                    .IsRequired();

                entity.Property(p => p.Password)
                    .HasMaxLength(30)
                    .IsRequired();

                entity.Property(p => p.Orders)
                    .IsRequired();

            });
        }
        public class DateOnlyConverter : ValueConverter<DateOnly, DateTime>
        {
            public DateOnlyConverter()
                : base(
                    dateOnly => dateOnly.ToDateTime(TimeOnly.MinValue),
                    dateTime => DateOnly.FromDateTime(dateTime))
            {
            }
        }

        public class DateOnlyComparer : ValueComparer<DateOnly>
        {
            public DateOnlyComparer()
                : base(
                    (d1, d2) => d1 == d2 && d1.DayNumber == d2.DayNumber,
                    d => d.GetHashCode())
            {
            }
        }
    }
}