using Microsoft.EntityFrameworkCore;

namespace DripGuide.Models
{
    public class DripContext : DbContext
    {
        public DripContext(DbContextOptions<DripContext> options) : base(options)
        {

        }

        public DbSet<User> Users { set; get; }
        public DbSet<Brand> Brands { set; get; }
        public DbSet<Post> Posts { set; get; }
        public DbSet<Comment> Comments { set; get; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>().HasKey(u => u.Id).HasName("PK_User");
            modelBuilder.Entity<User>().Property(u => u.Id).HasColumnType("int").UseIdentityColumn().IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Name).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Password).HasColumnType("nvarchar(150)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Email).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<User>().Property(u => u.Role).HasColumnType("tinyint");


            modelBuilder.Entity<Comment>().ToTable("Comment");
            modelBuilder.Entity<Comment>().HasKey(u => u.Id).HasName("PK_Comment");
            modelBuilder.Entity<Comment>().Property(u => u.Id).HasColumnType("int").UseIdentityColumn().IsRequired();
            modelBuilder.Entity<Comment>().Property(u => u.Text).HasColumnType("nvarchar(200)").IsRequired();
            modelBuilder.Entity<Comment>().Property(u => u.User).HasColumnType("int");
            modelBuilder.Entity<Comment>().HasIndex(e => e.User, "fk_user");
            modelBuilder.Entity<Comment>().Property(u => u.SubmitTime).HasColumnType("datetime");
            modelBuilder.Entity<Comment>().HasIndex(u => u.PostId);
            modelBuilder.Entity<Comment>().Property(u => u.PostId).HasColumnType("int");

            modelBuilder.Entity<Comment>().HasOne(u => u.PostNavigation)
                .WithMany(p => p.Comments)
                .HasForeignKey(u => u.PostId);


            modelBuilder.Entity<Post>().ToTable("Post");
            modelBuilder.Entity<Post>().HasKey(u => u.Id).HasName("PK_Post");
            modelBuilder.Entity<Post>().Property(u => u.Id).HasColumnType("int").UseIdentityColumn().IsRequired();
            modelBuilder.Entity<Post>().Property(u => u.Title).HasColumnType("nvarchar(100)").IsRequired();
            modelBuilder.Entity<Post>().Property(u => u.Description).HasColumnType("nvarchar(500)");
            modelBuilder.Entity<Post>().Property(u => u.Description2).HasColumnType("nvarchar(300)");
            modelBuilder.Entity<Post>().Property(u => u.FK_User).HasColumnType("int");
            //modelBuilder.Entity<Post>().HasIndex(e => e.FK_User, "fk_user");
            modelBuilder.Entity<Post>().Property(u => u.FK_Brand).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.SubmitDate).HasColumnType("datetime");
            modelBuilder.Entity<Post>().Property(u => u.Status).HasColumnType("int");
            modelBuilder.Entity<Post>().Property(u => u.Material).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.Price).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.ReleaseDate).HasColumnType("datetime");
            modelBuilder.Entity<Post>().Property(u => u.StyleCode).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.Colorway).HasColumnType("nvarchar(100)");
            modelBuilder.Entity<Post>().Property(u => u.Image).HasColumnType("nvarchar(200)");
            modelBuilder.Entity<Post>().HasIndex(u => u.BrandId);
            modelBuilder.Entity<Post>().Property(u => u.BrandId).HasColumnType("int");

            modelBuilder.Entity<Post>().HasOne(u => u.BrandNavigation)
                .WithMany(p => p.Posts)
                .HasForeignKey(u => u.BrandId);


            modelBuilder.Entity<Brand>().ToTable("Brand");
            modelBuilder.Entity<Brand>().HasKey(u => u.Id).HasName("PK_Brand");
            modelBuilder.Entity<Brand>().Property(u => u.Id).HasColumnType("int").UseIdentityColumn().IsRequired();
            modelBuilder.Entity<Brand>().Property(u => u.Name).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<Brand>().Property(u => u.Description).HasColumnType("nvarchar(500)");
            modelBuilder.Entity<Brand>().Property(u => u.EstablishmentDate).HasColumnType("datetime");
            modelBuilder.Entity<Brand>().Property(u => u.Founder).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<Brand>().Property(u => u.Headquarters).HasColumnType("nvarchar(50)").IsRequired();
            modelBuilder.Entity<Brand>().Property(u => u.Image).HasColumnType("nvarchar(200)");
        }
    }
}
