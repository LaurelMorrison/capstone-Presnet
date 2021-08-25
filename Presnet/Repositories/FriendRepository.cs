using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Presnet.models;
using Presnet.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.Repositories
{
    public class FriendRepository : BaseRepository, IFriendRepository
    {
        public FriendRepository(IConfiguration configuration) : base(configuration) { }

        public Friend AddFriend(Friend friend)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())

                {
                    cmd.CommandText = @"
                            INSERT INTO Friend (userId, friendId, statusId)
                            OUTPUT Inserted.id
                            VALUES (@userId, @friendId, @statusId); ";
                    cmd.Parameters.AddWithValue("@userId", friend.userId);
                    cmd.Parameters.AddWithValue("@friendId", friend.friendId);
                    cmd.Parameters.AddWithValue("@statusId", 3);

                    int id = (int)cmd.ExecuteScalar();

                    friend.id = id;
                    return friend;
                }

            }

        }

        public Friend GetFriendById(int friendId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT distinct 
                                            up.firstName, up.mobilePhone, up.id as friendId, 
                                            up.lastName, up.email, up.address, 
                                            up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId,
                                            cs.size, fc.color
                                        FROM friend f
                                            LEFT JOIN userProfile up ON up.id = f.userId OR up.id =f.friendId
                                            LEFT JOIN clothingSize cs ON cs.id = up.clothingSizeId
                                            LEFT JOIN favoriteColor fc ON fc.id = up.favoriteColorId
                                        Where up.id = @friendId";
                    cmd.Parameters.AddWithValue("@friendId", friendId);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        return new Friend()
                        {
                            UserProfile = new UserProfile()
                            {
                                firstName = DbUtils.GetString(reader, "firstName"),
                                id = DbUtils.GetInt(reader, "friendId"),
                                mobilePhone = DbUtils.GetString(reader, "mobilePhone"),
                                lastName = DbUtils.GetString(reader, "lastName"),
                                email = DbUtils.GetString(reader, "email"),
                                address = DbUtils.GetString(reader, "address"),
                                age = DbUtils.GetInt(reader, "age"),
                                shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                                clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                                favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId")
                            },
                            ClothingSize = new ClothingSize()
                            {
                                size = reader.GetString(reader.GetOrdinal("size")),
                            },
                            FavoriteColor = new FavoriteColor()
                            {
                                color = reader.GetString(reader.GetOrdinal("color")),
                            }
                        };
                    }

                    reader.Close();
                }
                return null;
            }
        }

        public List<Friend> GetAllPending(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT f.id, f.userId, f.friendId, f.statusId,
                                             up.firstName, up.lastName
                                        FROM friend f
                                        LEFT JOIN userProfile up ON up.id = f.userId
                                        WHERE statusId = 3 AND f.friendId = @id ";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var friends = new List<Friend>();

                    while (reader.Read())
                    {
                            friends.Add(new Friend()
                            {
                                id = DbUtils.GetInt(reader, "id"),
                                userId = DbUtils.GetInt(reader, "userId"),
                                friendId = DbUtils.GetInt(reader, "friendId"),
                                statusId = DbUtils.GetInt(reader, "statusId"),
                                UserProfile = new UserProfile()
                                {
                                    firstName = DbUtils.GetString(reader, "firstName"),
                                    lastName = DbUtils.GetString(reader, "lastName")
                                }
                            });
                    }

                    reader.Close();

                    return friends;
                }
            }
        }

        public void acceptFriend(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE friend 
                            SET statusId = 1
                            WHERE id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void RejectFriend(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            UPDATE friend 
                            SET statusId = 2
                            WHERE id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void DeleteFriend(int userId, int friendId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE Friend 
                                        SET 
                                            statusId=2 
                                        WHERE (
                                        friendId = @userId or userId = @userId)
                                        AND (friendId = @friendId or userId = @friendId)";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    DbUtils.AddParameter(cmd, "@friendId", friendId);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

