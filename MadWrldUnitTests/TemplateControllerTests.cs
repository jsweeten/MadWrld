using MadWrld.Controllers;
using MadWrld.Models;
using MadWrld.Tests.Mocks;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace MadWrld.Tests
{
    public class TemplateControllerTests : ControllerBase
    {
        [Fact]
        public void GetById_Returns_Correct_Template()
        {
            // Arrange
            var testTemplateId = 99;
            var templates = CreateTestTemplates(5);
            var users = CreateTestUserProfiles(5);
            var madlibs = CreateTestMadLib(5, 1, 1);
            var answerTemplates = CreateTestAnswerTemplates(1);
            templates[0].Id = testTemplateId;

            var testTemplateRepo = new InMemoryTemplateRepository(templates);
            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var testMadLibRepo = new InMemoryMadLibRepository(madlibs);
            var testAnswerTemplateRepo = new InMemoryAnswerTemplateRepository(answerTemplates);
            var controller = new TemplateController(testTemplateRepo,
                testUserProfileRepo,
                testMadLibRepo,
                testAnswerTemplateRepo);

            // Act
            var result = controller.Get(testTemplateId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualTemplate = Assert.IsType<MLTemplate>(okResult.Value);

            Assert.Equal(testTemplateId, actualTemplate.Id);
        }
        
        [Fact]
        public void Delete_Template_Function()
        {
            // Arrange
            var testTemplateId = 99;
            var templates = CreateTestTemplates(5);
            var users = CreateTestUserProfiles(5);
            var madlibs = CreateTestMadLib(5, 1, 1);
            var answerTemplates = CreateTestAnswerTemplates(1);
            templates[0].Id = testTemplateId;

            var testTemplateRepo = new InMemoryTemplateRepository(templates);
            var testUserProfileRepo = new InMemoryUserProfileRepository(users);
            var testMadLibRepo = new InMemoryMadLibRepository(madlibs);
            var testAnswerTemplateRepo = new InMemoryAnswerTemplateRepository(answerTemplates);
            var controller = new TemplateController(testTemplateRepo,
                testUserProfileRepo,
                testMadLibRepo,
                testAnswerTemplateRepo);

            // Act
            var result = controller.Delete(testTemplateId);

            // Assert
            var okResult = Assert.IsType<NoContentResult>(result);
            var actualTemplate = Assert.IsType<MLTemplate>(okResult);

            Assert.Equal(testTemplateId, actualTemplate.Id);
        }

        private List<MLTemplate> CreateTestTemplates(int count)
        {
            var templates = new List<MLTemplate>();
            for (var i = 1; i <= count; i++)
            {
                templates.Add(new MLTemplate()
                {
                    Id = i,
                    Title = $"Title {i}",
                    UserId = i,
                    AnswerTemplates = CreateTestAnswerTemplates(i)
                });
            }
            return templates;
        }

        private List<UserProfile> CreateTestUserProfiles(int count)
        {
            var users = new List<UserProfile>();
            for (var i = 1; i <= count; i++)
            {
                users.Add(new UserProfile()
                {
                    Id = i,
                    FirstName = $"User FirstName {i}",
                    LastName = $"User LastName {i}",
                    Email = $"user{i}@email.com"
                });
            }
            return users;
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
