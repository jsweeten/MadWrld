using MadWrld.Controllers;
using MadWrld.Models;
using MadWrld.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using Xunit;

namespace MadWrld.Tests
{
    public class UserProfileControllerTests : ControllerBase
    {
        [Fact]
        private 

        [Fact]
        public void GetsAllUsers()
        {
            // Arrange
            var users = CreateTestUsers(12);

            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var controller = new UserProfileController(testUserProfileRepo);

            // Act
            var result = controller.GetAllUsers();

            // Assert
            var okResult = Assert.IsType<OkResult>(result);
            _ = Assert.IsType<UserProfile>(okResult);
            Assert.Equal(12, users.Count);
        }

        private List<UserProfile> CreateTestUsers(int count)
        {
            var users = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                users.Add(new UserProfile()
                {
                    Id = i,
                    FirstName = $"User {i} first name",
                    LastName = $"User {i} last name",
                    Email = $"user{i}@internet.com",
                    UserTypeId = GetRandomUserTypeId(),
                    FirebaseUserId = "twentyletterslongggg"
                }); ;
            }
            return users;
        }
        private static int GetRandomUserTypeId()
        {
            Random random = new Random();
            return random.Next(1, 3);
        }

        private List<MLAnswerTemplate> CreateTestAnswerTemplates(int id)
        {
            var answerTemplates = new List<MLAnswerTemplate>();
            for (var i = 1; i < 10; i++)
            {
                answerTemplates.Add(new MLAnswerTemplate()
                {
                    Id = i,
                    TemplateId = id,
                    Position = i,
                    PartOfSpeech = "Noun",
                    Content = $"This is a test!"
                });
            }
            return answerTemplates;
        }
        private List<MadLib> CreateTestMadLib(int count, int userId, int templateId)
        {
            var madlibs = new List<MadLib>();
            for (var i = 1; i <= count; i++)
            {
                madlibs.Add(new MadLib()
                {
                    Id = i,
                    TemplateId = templateId,
                    UserProfileId = userId,
                    Inputs = "A string of user inputs",
                    Story = "A story comprised of answer templates and user inputs"
                });
            }
            return madlibs;
        }
    }
}
