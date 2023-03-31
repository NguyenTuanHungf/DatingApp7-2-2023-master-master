using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Data
{
    
    public class DataContext : IdentityDbContext<AppUser,AppRole, int, 
    IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, 
    IdentityRoleClaim<int>, IdentityUserToken<int>>  
  



    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

   

        public DbSet<UserLike> Likes { get; set; }
        

        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                    .HasMany(ur=> ur.UserRoles) 
                    .WithOne(u=> u.User)  //
                    .HasForeignKey(ur=>ur.UserId) 
                    .IsRequired();  

             builder.Entity<AppRole>()
                    .HasMany(ur=> ur.UserRoles) 
                    .WithOne(u=>u.Role)
                    .HasForeignKey(ur=>ur.RoleId) 
                    .IsRequired();

        

            builder.Entity<UserLike>()
               .HasKey(k => new {k.SourceUserId, k.LikedUserId});


            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s=>s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserLike>()
                .HasOne(s => s.LikedUser)
                .WithMany(l => l.LikeByUsers)  
                .HasForeignKey(s=>s.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade); 
            
            builder.Entity<Message>()
                .HasOne(u=> u.Recipient) 
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);
                //
            builder.Entity<Message>()
                .HasOne(u=> u.Sender) 
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
        }
     


    }
}






















/*
Các dòng code trong phương thức OnModelCreating sẽ cấu hình một số quan hệ giữa các bảng trong cơ sở dữ liệu
và sử dụng Fluent API để định nghĩa các thuộc tính của bảng.

Cụ thể, dòng đầu tiên base.OnModelCreating(builder); 
gọi phương thức cơ sở của lớp cha OnModelCreating,
để bảo đảm rằng tất cả các cấu hình cơ bản của Entity Framework được thực hiện.

Dòng tiếp theo builder.Entity<UserLike>().HasKey(k => new {k.SourceUserId, k.LikedUserId});
định nghĩa rằng bảng UserLike có khóa chính được tạo từ cột SourceUserId và LikedUserId.
Điều này cho phép Entity Framework map các đối tượng UserLike trong ứng dụng C# với các bản ghi trong bảng tương ứng trong cơ sở dữ liệu.

Dòng tiếp theo builder.Entity<UserLike>().HasOne(s => s.SourceUser).WithMany(l => l.LikeUsers).HasForeignKey(s=>s.SourceUserId).OnDelete(DeleteBehavior.Cascade); 
định nghĩa mối quan hệ giữa bảng UserLike và bảng AppUser thông qua thuộc tính SourceUser của lớp UserLike.
 Điều này cho phép Entity Framework map một đối tượng UserLike với một đối tượng AppUser trong cơ sở dữ liệu.
Mối quan hệ được thiết lập là "một nhiều" (một người dùng có thể thích nhiều người dùng khác), 
được định nghĩa bởi phương thức WithMany. Thuộc tính LikeUsers trên đối tượng AppUser sẽ lưu trữ tất cả các UserLike mà người dùng đó đã thích. Phương thức HasForeignKey được sử dụng để định nghĩa khóa ngoại của mối quan hệ giữa hai bảng và OnDelete để thiết lập hành động khi có sự xóa dữ liệu bảng AppUser.
*/
