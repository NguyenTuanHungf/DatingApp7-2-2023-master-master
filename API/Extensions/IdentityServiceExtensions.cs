using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityService(this IServiceCollection services, IConfiguration config)
        {
          

            services.AddIdentityCore<AppUser>(opt => 
            {
                opt.Password.RequireNonAlphanumeric= false;
               
                
            })
                .AddRoles<AppRole>() 
                .AddRoleManager<RoleManager<AppRole>>() 
                .AddSignInManager<SignInManager<AppUser>>() 
                .AddRoleValidator<RoleValidator<AppRole>>()
                .AddEntityFrameworkStores<DataContext>();
        
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
              .AddJwtBearer(options =>
              {
                  options.TokenValidationParameters = new TokenValidationParameters
                  {
                      ValidateIssuerSigningKey = true,
                      IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                      ValidateIssuer = false,
                      ValidateAudience = false,
                  };
              });
            
            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("RequireAdminRole", policy=> policy.RequireRole("Admin"));// cho phép ng dùng có vai trò admin mới có quyền truy cập
                opt.AddPolicy("ModeratePhotoRole", policy=> policy.RequireRole("Admin", "Moderator")); // cho phép ng dùng có vai trò admin hoăc moderator ms có quyền truy cập

            });
 


            return services;
        }
    }
}
