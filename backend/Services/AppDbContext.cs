using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using lesson_1.Models;
using Microsoft.EntityFrameworkCore;

namespace lesson_1.Services
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {

        public required DbSet<Car> Cars { get; set; }
        public required DbSet<Category> Categories { get; set; }

        public required DbSet<Service> Services { get; set; }
        public required DbSet<Favorite> Favorites { get; set; }

        public required DbSet<User> Users { get; set; }
        public object? CarServices { get; internal set; }
    }
}
