using MadWrld.Controllers;
using MadWrld.Models;
using MadWrld.Tests.Utils;
using MadWrld.Tests.Mocks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.AspNetCore.Routing;
using Xunit;

namespace MadWrld.Tests
{
    public class TemplateControllerTests : ControllerBase
    {
        [Fact]
        internal void GetById_Returns_Correct_Template()
        {
            // Arrange
            var testTemplateId = 99;
            var templates = TestUtils.CreateTestTemplates(5);
            var madlibs = TestUtils.CreateTestMadLib(5, 1, 1);
            var answerTemplates = TestUtils.CreateTestAnswerTemplates(1);
            templates[0].Id = testTemplateId;
            var currentUser = TestUtils.CreateCurrentUser();
            var httpContext = new DefaultHttpContext();
            httpContext.Items["CurrentUser"] = currentUser;
            var httpContextAccessor = new HttpContextAccessor { HttpContext = httpContext };
            var actionContext = new ActionContext(httpContext, new RouteData(), new ControllerActionDescriptor());

            var testTemplateRepo = new InMemoryTemplateRepository(templates);
            var testMadLibRepo = new InMemoryMadLibRepository(madlibs);
            var testAnswerTemplateRepo = new InMemoryAnswerTemplateRepository(answerTemplates);
            var controller = new TemplateController(testTemplateRepo,
                testMadLibRepo,
                testAnswerTemplateRepo, httpContextAccessor);

            controller.ControllerContext = new ControllerContext(actionContext);

            // Act
            var result = controller.Get(testTemplateId);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            var actualTemplate = Assert.IsType<MLTemplate>(okResult.Value);

            Assert.Equal(testTemplateId, actualTemplate.Id);
        }
        
        [Fact]
        internal void Delete_Template_Function()
        {
            // Arrange
            var testTemplateId = 99;
            var templates = TestUtils.CreateTestTemplates(5);
            var madlibs = TestUtils.CreateTestMadLib(5, 1, 1);
            var answerTemplates = TestUtils.CreateTestAnswerTemplates(1);
            templates[0].Id = testTemplateId;
            var currentUser = TestUtils.CreateCurrentUser();
            var httpContext = new DefaultHttpContext();
            httpContext.Items["CurrentUser"] = currentUser;
            var httpContextAccessor = new HttpContextAccessor { HttpContext = httpContext };
            var actionContext = new ActionContext(httpContext, new RouteData(), new ControllerActionDescriptor());


            var testTemplateRepo = new InMemoryTemplateRepository(templates);
            var testMadLibRepo = new InMemoryMadLibRepository(madlibs);
            var testAnswerTemplateRepo = new InMemoryAnswerTemplateRepository(answerTemplates);
            var controller = new TemplateController(testTemplateRepo,
                testMadLibRepo,
                testAnswerTemplateRepo, httpContextAccessor);

            controller.ControllerContext = new ControllerContext(actionContext);

            // Act
            var result = controller.Delete(testTemplateId);

            // Assert
            var okResult = Assert.IsType<NoContentResult>(result);

            Assert.IsType<NoContentResult>(okResult);
        }
    }
}
