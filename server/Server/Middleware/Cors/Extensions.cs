using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

namespace Server.Middleware.Cors
{
    public static class Extensions
    {
        public static IServiceCollection AddClientAppCors(this IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("ClientApp",
                    builder =>
                    {
                        builder.AllowAnyOrigin().AllowAnyHeader();
                        builder.AllowAnyOrigin().AllowAnyMethod();
                    });
            });

            return services;
        }

        public static IApplicationBuilder UseClientAppCors(this IApplicationBuilder builder)
        {
            builder.UseCors("ClientApp");

            return builder;
        }
    }
}
