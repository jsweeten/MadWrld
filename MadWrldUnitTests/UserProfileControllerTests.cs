using MadWrld.Controllers;
using MadWrld.Models;
using MadWrld.Tests.Mocks;
using MadWrld.Tests.Utils;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Xunit;

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
            var controller = new UserProfileController(testUserProfileRepo);

            // Act
            var result = controller.GetAllUsers();

            // Assert
            var okResult = Assert.IsType<OkResult>(result);
            _ = Assert.IsType<UserProfile>(okResult);
            Assert.Equal(12, users.Count);
        }
        [Fact]
        internal static void GetUserById_ReturnsUser()
        {
            // Arrange
            var users = TestUtils.CreateTestUsers(3);
            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(testUserProfileRepo);
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
            var users = TestUtils.CreateTestUsers(3);
            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(testUserProfileRepo);
            var userId = 10; // Assuming user with ID 10 does not exist in the mock data

            // Act
            var result = controller.GetUserById(userId);

            // Assert
            Assert.IsType<NotFoundResult>(result);
        }
    }
}
