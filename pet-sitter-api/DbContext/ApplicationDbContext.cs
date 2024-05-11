using Microsoft.EntityFrameworkCore;
using pet_sitter_api.Entities;

namespace pet_sitter_api
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Note> Notes => Set<Note>();
        public DbSet<Photo> Photos => Set<Photo>();

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : base(dbContextOptions)
        {
        }
    }

}