using Microsoft.Extensions.Configuration;
using Presnet.models;
using Presnet.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.Repositories
{
    public class FavoriteColorRepository : BaseRepository, IFavoriteColorRepository
    {
        public FavoriteColorRepository(IConfiguration configuration) : base(configuration) { }

        public List<FavoriteColor> GetAllColors()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT fc.id, fc.color as favColor
                          FROM favoriteColor fc";

                    var reader = cmd.ExecuteReader();

                    var colors = new List<FavoriteColor>();
                    while (reader.Read())
                    {
                        colors.Add(new FavoriteColor()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            color = reader.GetString(reader.GetOrdinal("favColor"))
                        });
                    }
                    reader.Close();
                    return colors;
                }
            }
        }
        public FavoriteColor GetColorById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT fc.id, fc.color as favColor
                          FROM favoriteColor fc 
                          WHERE id = @id ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    FavoriteColor color = null;

                    if (reader.Read())
                    {
                        color = new FavoriteColor()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            color = DbUtils.GetString(reader, "favColor")
                        };
                    }

                    reader.Close();

                    return color;
                }
            }
        }
    }
}
