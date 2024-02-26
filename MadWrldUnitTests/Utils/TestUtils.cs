using MadWrld.Models;
using System;
using System.Collections.Generic;

namespace MadWrld.Tests.Utils
{
    internal class TestUtils
    {
        internal static int GetRandomUserTypeId()
        {
            Random random = new();
            return random.Next(1, 3);
        }
        internal static string GenerateRandomUUID()
        {
            Random random = new();

            int stringLength = random.Next(28, 28);
            int randValue;
            string randomUUID = "";
            char letter;
            for (int i = 0; i < stringLength; i++)
            {
                randValue = random.Next(0, 26);
                letter = Convert.ToChar(randValue + 65);

                randomUUID += letter;
            };
            
            return randomUUID;
        }
        internal static List<UserProfile> CreateTestUsers(int count)
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
                    UserTypeId = TestUtils.GetRandomUserTypeId(),
                    FirebaseUserId = TestUtils.GenerateRandomUUID(),
                }); ;
            }
            return users;
        }
        internal static List<MLAnswerTemplate> CreateTestAnswerTemplates(int id)
        {
            var answerTemplates = new List<MLAnswerTemplate>();
            for (var i = 1; i <= 10; i++)
            {
                answerTemplates.Add(new MLAnswerTemplate()
                {
                    Id = i,
                    TemplateId = id,
                    Position = i,
                    PartOfSpeech = "Noun",
                    Content = $"Sentence number {i}!"
                });
            }
            return answerTemplates;
        }
        internal static List<MadLib> CreateTestMadLib(int count, int userId, int templateId)
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
        internal static UserProfile CreateCurrentUser()
        {
            var user = new UserProfile()
            {
                Id = 0,
                FirstName = "CurrentUserFirst",
                LastName = "CurrentUserLast",
                Email = "test@test.com",
                FirebaseUserId = GenerateRandomUUID(),
                UserTypeId = 1,
                UserType = new UserType()
                {
                    Id = 1,
                    Name = "Admin"
                }
            };
            return user;
        }
    }
}
