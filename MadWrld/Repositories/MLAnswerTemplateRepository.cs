using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using MadWrld.Models;
using MadWrld.Utils;
using System.Linq;

namespace MadWrld.Repositories
{
    public class MLAnswerTemplateRepository : BaseRepository, IMLAnswerTemplateRepository
    {
        public MLAnswerTemplateRepository(IConfiguration configuration) : base(configuration) { }

        public void Add(MLAnswerTemplate sentence)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO MLAnswerTemplate (TemplateId, Position, Content, PartOfSpeech)
                                        OUTPUT INSERTED.ID
                                        VALUES (@TemplateId, @Position, @Content, @PartOfSpeech)";
                    DbUtils.AddParameter(cmd, "@TemplateId", sentence.TemplateId);
                    DbUtils.AddParameter(cmd, "@Position", sentence.Position);
                    DbUtils.AddParameter(cmd, "@Content", sentence.Content);
                    DbUtils.AddParameter(cmd, "@PartOfSpeech", sentence.PartOfSpeech);

                    sentence.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}
