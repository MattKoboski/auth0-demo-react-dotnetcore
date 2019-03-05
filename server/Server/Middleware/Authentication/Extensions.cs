using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Middleware.Authentication
{
    public static class Extensions
    {
        public static IServiceCollection AddAuth0Authentication(this IServiceCollection services)
        {
            Auth0Options options;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                var configuration = serviceProvider.GetService<IConfiguration>();
                options = configuration.GetOptions<Auth0Options>(nameof(Auth0Options));
            }

            if (!options.Enabled)
            {
                return services;
            }

            services.AddAuthentication(configuration =>
            {
                configuration.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                configuration.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;

            }).AddJwtBearer(configuration =>
            {
                configuration.Authority = options.Authority;
                configuration.Audience = options.Audience;
            });
            services.AddAuthorization(configuration => {
                configuration.AddPolicy("Admin", policy => policy.RequireClaim(options.Claim, "admin"));
            });

            return services;
        }
    }
}
