using EverMoments_Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EverMoments_Data
{
    public class ApplicationDbContext : DbContext
    {

        public DbSet<User> Users { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Log> Logs { get; set; }
        public DbSet<UserImageShare> UserImageShares { get; set; }
        public DbSet<SharedImage> SharedImages { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) :
        base(options)
        { }

      

    }
}
