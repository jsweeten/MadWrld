using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using MadWrld.Repositories;

namespace MadWrld.Middleware
{
    public class CurrentUserMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IUserProfileRepository _userProfileRepository;

        public CurrentUserMiddleware(RequestDelegate next, IUserProfileRepository userProfileRepository)
        {
            _next = next;
            _userProfileRepository = userProfileRepository;
        }

        public async Task Invoke(HttpContext context)
        {
            var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!string.IsNullOrEmpty(userId))
            {
                var userProfile = await _userProfileRepository.GetByFirebaseUserIdAsync(userId);
                context.Items["CurrentUser"] = userProfile;
            }

            await _next(context);
        }
    }
}
