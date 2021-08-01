﻿using Microsoft.Data.SqlClient;
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
                    cmd.CommandText = @"SELECT f.id, f.userId, f.friendId, f.statusId, fs.status, 
                                             up.firstName as UserName, fup.firstName as FriendFirstName, fup.id as FriendId, 
                                             fup.lastName as FriendLastName, fup.email as FriendEmail, fup.address as FriendAddess, 
                                             fup.age as FriendAge, fup.shoeSize as FriendShoeSize, fup.clothingSizeId as FriendClothingSizeId, 
                                             fup.favoriteColorId as FriendColorId, cs.size as FriendClothingSize, fc.color as FriendFavoriteColor
                                        FROM friend f
                                        LEFT JOIN friendStatus fs ON fs.id = f.statusId
                                        LEFT JOIN userProfile up ON up.id = f.userId
                                        LEFT JOIN userProfile fup ON fup.id = f.friendId
                                        LEFT JOIN clothingSize cs ON cs.id = fup.clothingSizeId
                                        LEFT JOIN favoriteColor fc ON fc.id = fup.favoriteColorId
                                        Where friendId = @friendId";
                    cmd.Parameters.AddWithValue("@friendId", friendId);
                    var reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        return new Friend()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            userId = DbUtils.GetInt(reader, "userId"),
                            friendId = DbUtils.GetInt(reader, "friendId"),
                            statusId = DbUtils.GetInt(reader, "statusId"),
                            FriendStatus = new FriendStatus()
                            {
                                status = reader.GetString(reader.GetOrdinal("status")),
                            },
                            UserProfile = new UserProfile()
                            {
                                firstName = DbUtils.GetString(reader, "UserName"),
                            },
                            FriendProfile = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "FriendId"),
                                firstName = DbUtils.GetString(reader, "FriendFirstName"),
                                lastName = DbUtils.GetString(reader, "FriendLastName"),
                                email = DbUtils.GetString(reader, "FriendEmail"),
                                address = DbUtils.GetString(reader, "FriendAddess"),
                                age = DbUtils.GetInt(reader, "FriendAge"),
                                shoeSize = DbUtils.GetInt(reader, "FriendShoeSize"),
                                clothingSizeId = DbUtils.GetInt(reader, "FriendClothingSizeId"),
                                favoriteColorId = DbUtils.GetInt(reader, "FriendColorId")
                            },
                            ClothingSize = new ClothingSize()
                            {
                                size = reader.GetString(reader.GetOrdinal("FriendClothingSize")),
                            },
                            FavoriteColor = new FavoriteColor()
                            {
                                color = reader.GetString(reader.GetOrdinal("FriendFavoriteColor")),
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

