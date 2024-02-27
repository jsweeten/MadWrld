using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MadWrld.Models;
using MadWrld.Utils;
using System.Linq;

namespace MadWrld.Repositories
{
    public class MadLibRepository(IConfiguration configuration) : BaseRepository(configuration), IMadLibRepository
    {
        public List<MadLib> GetAll()
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                        SELECT ml.[Id] 'MadLib', ml.FinishedStory, ml.UserId, ml.MLTemplateId,
                        t.[Id] 'Template', t.Title,
                        up.[Id] 'User', up.FirstName, up.LastName, up.Email
                        FROM MadLib ml
                        LEFT JOIN MLTemplate t ON ml.MLTemplateId = t.[Id]
                        LEFT JOIN UserProfile up ON ml.UserId = up.[Id]
                        ORDER BY ml.[Id] DESC";

            using SqlDataReader reader = cmd.ExecuteReader();
            var madlibs = new List<MadLib>();
            while (reader.Read())
            {
                var madlibId = DbUtils.GetInt(reader, "MadLib");

                var existingMadLib = madlibs.FirstOrDefault(ml => ml.Id == madlibId);
                if (existingMadLib == null)
                {
                    existingMadLib = new MadLib()
                    {
                        Id = DbUtils.GetInt(reader, "MadLib"),
                        UserProfileId = DbUtils.GetInt(reader, "UserId"),
                        UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "User"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                        },
                        TemplateId = DbUtils.GetInt(reader, "Template"),
                        Template = new MLTemplate()
                        {
                            Title = DbUtils.GetString(reader, "Title")
                        },
                        Story = DbUtils.GetString(reader, "FinishedStory")
                    };
                    madlibs.Add(existingMadLib);
                }
            }
            return madlibs;
        }
        
        public MadLib GetById(int id)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                        SELECT ml.[Id] 'MadLib', ml.FinishedStory, ml.UserId, ml.MLTemplateId,
                        t.[Id] 'Template', t.Title,
                        up.[Id] 'User', up.FirstName, up.LastName, up.Email
                        FROM MadLib ml
                        LEFT JOIN MLTemplate t ON ml.MLTemplateId = t.[Id]
                        LEFT JOIN UserProfile up ON ml.UserId = up.[Id]
                        WHERE ml.[Id] = @id";

            DbUtils.AddParameter(cmd, "@id", id);

            using SqlDataReader reader = cmd.ExecuteReader();
            MadLib madlib = null;
            while (reader.Read())
            {
                madlib ??= new MadLib()
                    {
                        Id = DbUtils.GetInt(reader, "MadLib"),
                        UserProfileId = DbUtils.GetInt(reader, "UserId"),
                        UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "User"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                        },
                        TemplateId = DbUtils.GetInt(reader, "Template"),
                        Template = new MLTemplate()
                        {
                            Title = DbUtils.GetString(reader, "Title")
                        },
                        Story = DbUtils.GetString(reader, "FinishedStory")
                    };
            }
            return madlib;
        }

        public List<MadLib> GetByUserId(int id)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"
                        SELECT ml.[Id] 'MadLib', ml.FinishedStory, ml.UserId, ml.MLTemplateId,
                        t.[Id] 'Template', t.Title,
                        up.[Id] 'User', up.FirstName, up.LastName, up.Email
                        FROM MadLib ml
                        LEFT JOIN MLTemplate t ON ml.MLTemplateId = t.[Id]
                        LEFT JOIN UserProfile up ON ml.UserId = up.[Id]
                        WHERE ml.UserId = @id
                        ORDER BY ml.[Id] DESC";

            DbUtils.AddParameter(cmd, "@id", id);

            using SqlDataReader reader = cmd.ExecuteReader();
            var madlibs = new List<MadLib>();
            while (reader.Read())
            {
                var madlibId = DbUtils.GetInt(reader, "MadLib");

                var existingMadLib = madlibs.FirstOrDefault(ml => ml.Id == madlibId);
                if (existingMadLib == null)
                {
                    existingMadLib = new MadLib()
                    {
                        Id = DbUtils.GetInt(reader, "MadLib"),
                        UserProfileId = DbUtils.GetInt(reader, "UserId"),
                        UserProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "User"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                        },
                        TemplateId = DbUtils.GetInt(reader, "Template"),
                        Template = new MLTemplate()
                        {
                            Title = DbUtils.GetString(reader, "Title")
                        },
                        Story = DbUtils.GetString(reader, "FinishedStory")
                    };
                    madlibs.Add(existingMadLib);
                }
            }
            return madlibs;
        }

        public void Add(MadLib madlib)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"INSERT INTO MadLib (MLTemplateId, [UserId], FinishedStory)
                                        OUTPUT INSERTED.ID
                                        VALUES (@MLTemplateId, @UserId, @finishedStory)";
            DbUtils.AddParameter(cmd, "@MLTemplateId", madlib.TemplateId);
            DbUtils.AddParameter(cmd, "@UserId", madlib.UserProfileId);
            DbUtils.AddParameter(cmd, "@finishedStory", madlib.Story);

            madlib.Id = (int)cmd.ExecuteScalar();
        }

        public void Remove(int id)
        {
            using var conn = Connection;
            conn.Open();
            using var cmd = conn.CreateCommand();
            cmd.CommandText = @"DELETE FROM MadLib
                                        WHERE Id = @id";
            DbUtils.AddParameter(cmd, "@id", id);

            cmd.ExecuteNonQuery();
        }
    }
}