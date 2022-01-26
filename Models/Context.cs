using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class Context:DbContext
    {
        public DbSet<Grad> Gradovi { get; set; }
        public DbSet<MetPodatak> Podaci { get; set; }
        public Context(DbContextOptions options)
        : base(options)
        { }
    }
}