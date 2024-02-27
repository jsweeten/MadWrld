using MadWrld.Controllers;
using MadWrld.Models;
using MadWrld.Tests.Mocks;
using MadWrld.Tests.Utils;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Mvc.Abstractions;
using Microsoft.AspNetCore.Routing;
using Xunit;
using System.Collections.Generic;

namespace MadWrld.Tests
{
    public class UserProfileControllerTests : ControllerBase
    {
        [Fact]
        internal static void GetsAllUsers()
        {
            // Arrange
            var currentUser = TestUtils.CreateCurrentUser();
            var users = TestUtils.CreateTestUsers(12);
            users.Add(currentUser);
            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var httpContext = new DefaultHttpContext();
            httpContext.Items["CurrentUser"] = currentUser;
            var httpContextAccessor = new HttpContextAccessor { HttpContext = httpContext };
            var controller = new UserProfileController(testUserProfileRepo, httpContextAccessor);
            var actionContext = new ActionContext(httpContext, new RouteData(), new ControllerActionDescriptor());
            controller.ControllerContext = new ControllerContext(actionContext);

            // Act
            var result = controller.GetAllUsers();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.IsType<List<UserProfile>>(okResult.Value);
            Assert.Equal(13, (okResult.Value as List<UserProfile>)?.Count);
        }
        [Fact]
        internal static void GetUserById_ReturnsUser()
        {
            // Arrange
            var currentUser = TestUtils.CreateCurrentUser();
            var users = TestUtils.CreateTestUsers(3);
            users.Add(currentUser);
            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var httpContext = new DefaultHttpContext();
            httpContext.Items["CurrentUser"] = currentUser;
            var httpContextAccessor = new HttpContextAccessor { HttpContext = httpContext };
            var controller = new UserProfileController(testUserProfileRepo, httpContextAccessor);
            var userId = 2;

            // Act
            var result = controller.GetUserById(userId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var userProfile = Assert.IsType<UserProfile>(okResult.Value);
            Assert.Equal(userId, userProfile.Id);
        }
        [Fact]
        internal static void GetUserById_ReturnsNotFound_WhenUserDoesNotExist()
        {
            // Arrange
            var currentUser = TestUtils.CreateCurrentUser();
            var users = TestUtils.CreateTestUsers(3);
            var httpContext = new DefaultHttpContext();
            httpContext.Items["CurrentUser"] = currentUser;
            var httpContextAccessor = new HttpContextAccessor { HttpContext = httpContext };
            users.Add(currentUser);
            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(testUserProfileRepo, httpContextAccessor);
            var userId = 10; // Assuming user with ID 10 does not exist in the mock data

            // Act
            var result = controller.GetUserById(userId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
