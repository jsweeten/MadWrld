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
                    cmd.CommandText = @"
                        SELECT t.[Id] 'Template', t.[Title], t.UserId,
                        at.[Id] 'AnswerTemplate', at.TemplateId, at.Position, at.PartOfSpeech, at.Content,
                        up.[Id] 'User', up.FirstName, up.LastName, up.Email
                        FROM MLTemplate t
                        LEFT JOIN UserProfile up
                        ON t.UserId = up.[Id]
                        LEFT JOIN MLAnswerTemplate at
                        ON t.[Id] = at.TemplateId
                        WHERE t.[Id] = @id";

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
                                    Id = DbUtils.GetInt(reader, "Template"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    User = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "User"),
                                        FirstName = DbUtils.GetString(reader, "FirstName"),
                                        LastName = DbUtils.GetString(reader, "LastName"),
                                        Email = DbUtils.GetString(reader, "Email")
                                    },
                                    AnswerTemplates = new List<MLAnswerTemplate>()
                                };
                            }
                            if (DbUtils.IsNotDbNull(reader, "AnswerTemplate"))
                            {
                                template.AnswerTemplates.Add(new MLAnswerTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "AnswerTemplate"),
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
                        SELECT t.[Id] 'Template', t.[Title], t.UserId,
                        at.[Id] 'AnswerTemplate', at.TemplateId, at.Position, at.PartOfSpeech, at.Content,
                        up.[Id] 'User', up.FirstName, up.LastName, up.Email
                        FROM MLTemplate t
                        LEFT JOIN UserProfile up
                        ON t.UserId = up.[Id]
                        LEFT JOIN MLAnswerTemplate at
                        ON t.[Id] = at.TemplateId";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var templates = new List<MLTemplate>();
                        while (reader.Read())
                        {
                            var templateId = DbUtils.GetInt(reader, "Template");

                            var existingTemplate = templates.FirstOrDefault(p => p.Id == templateId);
                            if (existingTemplate == null)
                            {
                                existingTemplate = new MLTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "Template"),
                                    Title = DbUtils.GetString(reader, "Title"),
                                    UserId = DbUtils.GetInt(reader, "UserId"),
                                    User = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "User"),
                                        FirstName = DbUtils.GetString(reader, "FirstName"),
                                        LastName = DbUtils.GetString(reader, "LastName"),
                                        Email = DbUtils.GetString(reader, "Email")
                                    },
                                    AnswerTemplates = new List<MLAnswerTemplate>()
                                };
                                templates.Add(existingTemplate);
                            }

                            if (DbUtils.IsNotDbNull(reader, "AnswerTemplate"))
                            {
                                existingTemplate.AnswerTemplates.Add(new MLAnswerTemplate()
                                {
                                    Id = DbUtils.GetInt(reader, "AnswerTemplate"),
                                    TemplateId = DbUtils.GetInt(reader, "TemplateId"),
                                    Position = DbUtils.GetInt(reader, "Position"),
                                    PartOfSpeech = DbUtils.GetString(reader, "PartofSpeech"),
                                    Content = DbUtils.GetString(reader, "Content")
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
                    DbUtils.AddParameter(cmd, "@LastName", template.Title);
                    DbUtils.AddParameter(cmd, "@UserId", template.UserId);

                    template.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(MLTemplate template)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE MLTemplate
                                        SET Title = @title,
                                            UserId = @userId
                                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@title", template.Title);
                    DbUtils.AddParameter(cmd, "@userId", template.UserId);
                    DbUtils.AddParameter(cmd, "@id", template.Id);

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