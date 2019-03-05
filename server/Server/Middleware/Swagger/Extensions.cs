using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace Server.Middleware.Swagger
{
    public static class Extensions
    {
        public static IServiceCollection AddSwagger(this IServiceCollection services)
        {
            SwaggerOptions options;
            using (var serviceProvider = services.BuildServiceProvider())
            {
                var configuration = serviceProvider.GetService<IConfiguration>();
                options = configuration.GetOptions<SwaggerOptions>(nameof(SwaggerOptions));
            }

            if (!options.Enabled)
            {
                return services;
            }

            return services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = options.Project, Version = options.Version });
            });
        }

        public static IApplicationBuilder UseSwagger(this IApplicationBuilder builder)
        {
            var options = builder.ApplicationServices.GetService<IConfiguration>()
                .GetOptions<SwaggerOptions>(nameof(SwaggerOptions));
            if (!options.Enabled)
            {
                return builder;
            }

            SwaggerBuilderExtensions.UseSwagger(builder);
            builder.UseSwaggerUI(c => {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
                c.RoutePrefix = string.Empty;
            });
            return builder;
        }
    }
}
