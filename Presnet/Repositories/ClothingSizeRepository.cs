using Microsoft.Extensions.Configuration;
using Presnet.models;
using Presnet.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.Repositories
{
    public class ClothingSizeRepository : BaseRepository, IClothingSizeRepository
    {
        public ClothingSizeRepository(IConfiguration configuration) : base(configuration) { }

        public List<ClothingSize> GetAllSizes()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT cs.id, cs.size 
                          FROM clothingSize cs";

                    var reader = cmd.ExecuteReader();

                    var sizes = new List<ClothingSize>();
                    while (reader.Read())
                    {
                        sizes.Add(new ClothingSize()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            size = reader.GetString(reader.GetOrdinal("size"))
                        });
                    }
                    reader.Close();
                    return sizes;
                }
            }
        }
        public ClothingSize GetSizeById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT cs.id, cs.size 
                          FROM clothingSize cs 
                          WHERE id = @id ";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    ClothingSize size = null;

                    if (reader.Read())
                    {
                        size = new ClothingSize()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            size = DbUtils.GetString(reader, "size")
                        };
                    }

                    reader.Close();

                    return size;
                }
            }
        }
    }
}
