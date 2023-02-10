using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MadWrld.Models;
using MadWrld.Utils;
using System.Linq;

namespace MadWrld.Repositories
{
    public class MLTemplateRepository : BaseRepository, IMLTemplateRepository
    {
        public MLTemplateRepository(IConfiguration configuration) : base(configuration) { }

        public MLTemplate GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                        t.[Id] 'TemplatePK', t.[Title], t.UserId,
                        at.[Id] 'AnswerTemplatePK', at.TemplateId, at.Position, at.PartOfSpeech, at.Content,
                        up.[Id] 'UserPK', up.FirstName, up.LastName, up.Email
                        FROM MLTemplate t
                        LEFT JOIN UserProfile up ON t.UserId = up.[Id]
                        LEFT JOIN MLAnswerTemplate at ON t.[Id] = at.TemplateId
                        WHERE t.[Id] = @id
                        ORDER BY at.Position";

                    DbUtils.AddParameter(cmd, "@id", id);


                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        MLTemplate template = null;
                        while (reader.Read())
                        {
                            if (template == null)
                            {
                                template = new MLTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "TemplatePK"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    User = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserPK"),
                                        FirstName = DbUtils.GetString(reader, "FirstName"),
                                        LastName = DbUtils.GetString(reader, "LastName"),
                                        Email = DbUtils.GetString(reader, "Email")
                                    },
                                    AnswerTemplates = new List<MLAnswerTemplate>(),
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "AnswerTemplatePK"))
                            {
                                template.AnswerTemplates.Add(new MLAnswerTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "AnswerTemplatePK"),
                                    TemplateId = DbUtils.GetInt(reader, "TemplateId"),
                                    Position = DbUtils.GetInt(reader, "Position"),
                                    PartOfSpeech = DbUtils.GetString(reader, "PartofSpeech"),
                                    Content = DbUtils.GetString(reader, "Content")
                                });
                            }
                        }
                        return template;
                    }
                }
            }
        }
        public List<MLTemplate> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT t.[Id] 'TemplatePK', t.[Title], t.UserId,
                        at.[Id] 'AnswerTemplatePK', at.TemplateId, at.Position, at.PartOfSpeech, at.Content,
                        up.[Id] 'UserPK', up.FirstName, up.LastName, up.Email, up.UserTypeId, ut.[Id], ut.[Name] 'UserType',
                        c.[Id] 'CategoryPK', c.[Name] 'CategoryName', ct.CategoryId 'CTCategoryId', ct.TemplateId 'CTTemplateId'
                        FROM MLTemplate t
                        LEFT JOIN UserProfile up ON t.UserId = up.[Id]
                        LEFT JOIN UserType ut ON up.UserTypeId = ut.[Id]
                        LEFT JOIN MLAnswerTemplate at ON t.[Id] = at.TemplateId
                        JOIN CategoryTemplate ct ON t.[Id] = ct.TemplateId
                        JOIN Category c ON ct.CategoryId = c.[Id]";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var templates = new List<MLTemplate>();
                        while (reader.Read())
                        {
                            var templateId = DbUtils.GetInt(reader, "TemplatePK");

                            var existingTemplate = templates.FirstOrDefault(t => t.Id == templateId);
                            if (existingTemplate == null)
                            {
                                existingTemplate = new MLTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "TemplatePK"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    User = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserPK"),
                                        FirstName = DbUtils.GetString(reader, "FirstName"),
                                        LastName = DbUtils.GetString(reader, "LastName"),
                                        Email = DbUtils.GetString(reader, "Email"),
                                        UserType = new UserType()
                                        {
                                            Name = DbUtils.GetString(reader, "UserType")
                                        }
                                    },
                                    AnswerTemplates = new List<MLAnswerTemplate>(),
                                    Categories = new List<Category>()
                                };
                                templates.Add(existingTemplate);
                            }

                            if (DbUtils.IsNotDbNull(reader, "AnswerTemplatePK"))
                            {
                                existingTemplate.AnswerTemplates.Add(new MLAnswerTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "AnswerTemplatePK"),
                                    TemplateId = DbUtils.GetInt(reader, "TemplateId"),
                                    Position = DbUtils.GetInt(reader, "Position"),
                                    PartOfSpeech = DbUtils.GetString(reader, "PartofSpeech"),
                                    Content = DbUtils.GetString(reader, "Content")
                                });
                            }
                            if (DbUtils.IsNotDbNull(reader, "CategoryPK"))
                            {
                                existingTemplate.Categories.Add(new Category()
                                {
                                    Id = DbUtils.GetInt(reader, "CategoryPK"),
                                    Name = DbUtils.GetString(reader, "CategoryName")
                                });
                            }
                        }
                        return templates;
                    }
                }
            }
        }

        public void Add(MLTemplate template)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO MLTemplate ([Title], UserId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@Title, @UserId)";
                    DbUtils.AddParameter(cmd, "@Title", template.Title);
                    DbUtils.AddParameter(cmd, "@UserId", template.UserId);

                    template.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(string oldTitle, string newTitle)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE MLTemplate
                                        SET Title = @newTitle,
                                        WHERE Title = @oldTitle";
                    DbUtils.AddParameter(cmd, "@newTitle", newTitle);
                    DbUtils.AddParameter(cmd, "@oldTitle", oldTitle);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Remove(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM MLTemplate
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}