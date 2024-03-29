﻿using Microsoft.Data.SqlClient;
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
       
        public List<MLTemplate> GetByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT
                        t.[Id] 'TemplatePK', t.[Title], t.UserId,
                        up.[Id] 'UserPK', up.FirstName, up.LastName, up.Email
                        FROM MLTemplate t
                        LEFT JOIN UserProfile up ON t.UserId = up.[Id]
                        WHERE up.[Id] = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    using (var reader = cmd.ExecuteReader())
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
                                        Email = DbUtils.GetString(reader, "Email")
                                    }
                                };
                                templates.Add(existingTemplate);
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

        public void Update(MLTemplate template)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE MLTemplate
                        SET Title = @title
                        WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", template.Id);
                    DbUtils.AddParameter(cmd, "@title", template.Title);

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