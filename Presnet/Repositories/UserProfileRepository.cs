using Microsoft.Extensions.Configuration;
using Presnet.models;
using Presnet.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.id, Up.firebaseUserId, up.firstName, up.lastName, up.email, up.address, up.createdTime, up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId
                          FROM UserProfile up
                         WHERE firebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firebaseUserId = DbUtils.GetString(reader, "firebaseUserId"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            email = DbUtils.GetString(reader, "email"),
                            address = DbUtils.GetString(reader, "address"),
                            createdTime = DbUtils.GetDateTime(reader, "createdTime"),
                            age = DbUtils.GetInt(reader, "age"),
                            shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                            clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                            favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (firebaseUserId, firstName, lastName, email, address, createdTime, age, shoeSize, clothingSizeId, favoriteColorId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firebaseUserId, @firstName, @lastName, @email, @address, @createdTime, @age, @shoeSize, @clothingSizeId, @favoriteColorId)";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.firebaseUserId);
                    DbUtils.AddParameter(cmd, "@firstName", userProfile.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.lastName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.email);
                    DbUtils.AddParameter(cmd, "@address", userProfile.address);
                    DbUtils.AddParameter(cmd, "@createdTime", DateTime.Now);
                    DbUtils.AddParameter(cmd, "@age", userProfile.age);
                    DbUtils.AddParameter(cmd, "@shoeSize", userProfile.shoeSize);
                    DbUtils.AddParameter(cmd, "@clothingSizeId", userProfile.clothingSizeId);
                    DbUtils.AddParameter(cmd, "@favoriteColorId", userProfile.favoriteColorId);

                    userProfile.id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public List<UserProfile> GetAllUsers()
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                            SELECT up.id, Up.firebaseUserId, up.firstName, up.lastName, up.email, up.address, up.createdTime, 
                                   up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId, cs.size as clothingSize, fc.color as favoriteColor
                            FROM UserProfile up
                            LEFT JOIN clothingSize cs ON cs.id = up.clothingSizeId
                            LEFT JOIN favoriteColor fc ON fc.id = up.favoriteColorId
                            ORDER BY firstName";

                        var reader = cmd.ExecuteReader();

                        var users = new List<UserProfile>();
                        while (reader.Read())
                        {
                            users.Add(new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "id"),
                                firebaseUserId = DbUtils.GetString(reader, "firebaseUserId"),
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName"),
                                email = DbUtils.GetString(reader, "email"),
                                address = DbUtils.GetString(reader, "address"),
                                createdTime = DbUtils.GetDateTime(reader, "createdTime"),
                                age = DbUtils.GetInt(reader, "age"),
                                shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                                clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                                favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId"),
                                ClothingSize = new ClothingSize()
                                {
                                    size = reader.GetString(reader.GetOrdinal("clothingSize")),
                                },
                                FavoriteColor = new FavoriteColor()
                                {
                                    color = reader.GetString(reader.GetOrdinal("favoriteColor")),
                                }
                            });
                        }
                        reader.Close();
                        return users;
                    }
                }
            }

        public List<UserProfile> GetAllNonFriend(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            Select up.firstName, up.lastName, up.id
                                FROM userProfile up
                                WHERE up.id != @id AND up.id != 1 AND up.id NOT IN (
                            SELECT f.friendId
                                FROM friend f
                                WHERE (f.statusId = 1 OR f.statusId = 2) AND f.UserId = @id
                                 ) AND up.id NOT IN (
                            SELECT f.userId
                                FROM friend f
                                WHERE (f.statusId = 1 OR f.statusId = 2) AND f.friendId = @id
                                  )";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName")
                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }


        public List<UserProfile> GetAllFriends(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"Select up.firstName, up.lastName, up.id
                                        FROM userProfile up
                                        LEFT JOIN friend f ON f.userId = up.id
                                        WHERE up.id IN (
                                                SELECT f.friendId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.userId = @id
                                                ) 
 
                                                OR up.id IN (
                                                SELECT f.userId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.friendId = @id
                                                )";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName")
                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public UserProfile GetUserById(int id)
            {
                using (var conn = Connection)
                {
                    conn.Open();
                    using (var cmd = conn.CreateCommand())
                    {
                        cmd.CommandText = @"
                          SELECT up.id, Up.firebaseUserId, up.firstName, up.lastName, up.fullName, up.email, up.address, up.createdTime, up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId
                          FROM UserProfile up
                          WHERE id = @id ";

                        DbUtils.AddParameter(cmd, "@id", id);
                        var reader = cmd.ExecuteReader();

                        UserProfile user = null;

                        if (reader.Read())
                        {
                            user = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "id"),
                                firebaseUserId = DbUtils.GetString(reader, "firebaseUserId"),
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName"),
                                email = DbUtils.GetString(reader, "email"),
                                address = DbUtils.GetString(reader, "address"),
                                createdTime = DbUtils.GetDateTime(reader, "createdTime"),
                                age = DbUtils.GetInt(reader, "age"),
                                shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                                clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                                favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId")
                            };
                        }

                        reader.Close();

                        return user;
                    }
                }
            }
        }
    }
