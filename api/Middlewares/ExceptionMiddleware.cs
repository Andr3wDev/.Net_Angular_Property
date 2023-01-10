using AngularAPI.Errors;
using AngularAPI.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Net;
using System.Threading.Tasks;

namespace AngularAPI.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IHostEnvironment _env;

        public ExceptionMiddleware(RequestDelegate next,
            ILogger<ExceptionMiddleware> logger,
            IHostEnvironment env)
        {
            this._next = next;
            this._logger = logger;
            this._env = env;
        }

        public ILogger<ExceptionMiddleware> _logger { get; }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                ApiError response;
                HttpStatusCode statusCode = HttpStatusCode.InternalServerError;
                string message;
                var exceptionType = ex.GetType();

                if(exceptionType == typeof(UnauthorizedAccessException))
                {
                    statusCode = HttpStatusCode.Forbidden;
                    message = "You are not authorised";
                }
                else
                {
                    statusCode = HttpStatusCode.InternalServerError;
                    message = "An error occured";
                }

                if(_env.IsDevelopment())
                {
                    response = new ApiError((int)statusCode,
                        ex.Message,ex.StackTrace.ToString());
                }
                else
                {
                    response = new ApiError((int)statusCode,
                        message);
                }
                _logger.LogError(ex, ex.Message);
                context.Response.StatusCode = (int)statusCode;
                context.Response.ContentType = "application/json";

                await context.Response.WriteAsync(response.ToString());
            }
        }
    }
}