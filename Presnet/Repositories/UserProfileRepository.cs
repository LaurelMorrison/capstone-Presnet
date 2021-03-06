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
                        SELECT up.id, up.firebaseUserId, up.firstName, up.lastName, up.email, up.mobilePhone, up.address, up.createdTime, up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId, cs.size, fc.color
                          FROM UserProfile up
                            LEFT JOIN clothingSize cs ON cs.id = up.clothingSizeId
                            LEFT JOIN favoriteColor fc ON fc.id = up.favoriteColorId
                         WHERE up.firebaseUserId = @firebaseUserId";

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
                            mobilePhone = DbUtils.GetString(reader, "mobilePhone"),
                            address = DbUtils.GetString(reader, "address"),
                            createdTime = DbUtils.GetDateTime(reader, "createdTime"),
                            age = DbUtils.GetInt(reader, "age"),
                            shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                            clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                            favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId"),
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
                    cmd.CommandText = @"INSERT INTO UserProfile (firebaseUserId, firstName, lastName, email, mobilePhone, address, createdTime, age, shoeSize, clothingSizeId, favoriteColorId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@firebaseUserId, @firstName, @lastName, @email, @mobilePhone, @address, @createdTime, @age, @shoeSize, @clothingSizeId, @favoriteColorId)";
                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.firebaseUserId);
                    DbUtils.AddParameter(cmd, "@firstName", userProfile.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.lastName);
                    DbUtils.AddParameter(cmd, "@email", userProfile.email);
                    DbUtils.AddParameter(cmd, "@mobilePhone", userProfile.mobilePhone);
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
                            SELECT up.id, Up.firebaseUserId, up.firstName, up.lastName, up.email, up.mobilePhone, up.address, up.createdTime, 
                                   up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId, cs.size as clothingSize, fc.color as favoriteColor,
                                   cs.id as sizeId, fc.id as colorId                            
                            FROM UserProfile up
                            LEFT JOIN clothingSize cs ON cs.id = up.clothingSizeId
                            LEFT JOIN favoriteColor fc ON fc.id = up.favoriteColorId
                            Group By up.id, Up.firebaseUserId, up.firstName, up.lastName, up.email, up.address, up.createdTime, 
                                   up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId, cs.size, fc.color,
                                   cs.id, fc.id 
                          Having up.id > 1
                         ORDER BY up.firstName";

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
                                mobilePhone = DbUtils.GetString(reader, "mobilePhone"),
                                address = DbUtils.GetString(reader, "address"),
                                createdTime = DbUtils.GetDateTime(reader, "createdTime"),
                                age = DbUtils.GetInt(reader, "age"),
                                shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                                clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                                favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId"),
                                ClothingSize = new ClothingSize()
                                {
                                    id = DbUtils.GetInt(reader, "id"),
                                    size = reader.GetString(reader.GetOrdinal("sizeId")),
                                },
                                FavoriteColor = new FavoriteColor()
                                {
                                    id = DbUtils.GetInt(reader, "colorId"),
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
                              Select distinct up.firstName, up.lastName, up.id, f.statusId
                                FROM userProfile up
                                LEFT JOIN friend f ON f.friendId = up.id AND f.userId = @id
                                WHERE up.id != @id AND up.id != 1 AND (up.id NOT IN (
                            SELECT f.friendId
                                FROM friend f
                                WHERE (f.statusId = 1 OR f.statusId = 2) AND f.UserId = @id
                                 )
                                 AND up.id NOT IN (
                            SELECT f.userId
                                FROM friend f
                                WHERE f.friendId = @id
                                  ))                         
                         ORDER BY up.firstName";
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            Friend = new Friend()
                            {
                                statusId = DbUtils.GetNullableInt(reader, "statusId")
                            }
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
                    cmd.CommandText = @"Select distinct up.firstName, up.lastName, up.id, f.statusId
                                        FROM userProfile up
                                        JOIN friend f ON f.userId = up.id OR f.friendId = up.id
                                        WHERE (up.id IN (
                                                SELECT f.friendId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.userId = @id
                                                ) 
 
                                                OR up.id IN (
                                                SELECT f.userId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.friendId = @id 
                                                ))
                                                AND f.statusId = 1 AND (
                                                f.friendId = @id OR f.userId = @id)
                                                ORDER BY up.firstName";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            Friend = new Friend()
                            {
                                statusId = DbUtils.GetNullableInt(reader, "statusId")
                            }
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
                          SELECT up.id, up.firstName, up.firebaseUserId, up.lastName, up.email, up.mobilePhone, up.address, up.age, up.shoeSize, up.clothingSizeId, up.favoriteColorId, cs.size as clothingSize, fc.color as favoriteColor, cs.id as sizeId, fc.id as colorId
                          FROM userProfile up
                            LEFT JOIN clothingSize cs ON cs.id = up.clothingSizeId
                            LEFT JOIN favoriteColor fc ON fc.id = up.favoriteColorId
                          WHERE up.id = @id ";

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
                                mobilePhone = DbUtils.GetString(reader, "mobilePhone"),
                                address = DbUtils.GetString(reader, "address"),
                                age = DbUtils.GetInt(reader, "age"),
                                shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                                clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                                favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId"),
                                ClothingSize = new ClothingSize()
                                {
                                    id = DbUtils.GetInt(reader, "sizeId"),
                                    size = reader.GetString(reader.GetOrdinal("clothingSize")),
                                },
                                FavoriteColor = new FavoriteColor()
                                {
                                    id = DbUtils.GetInt(reader, "colorId"),
                                    color = reader.GetString(reader.GetOrdinal("favoriteColor"))
                                }
                            };
                        }

                        reader.Close();

                        return user;
                    }
                }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile 
                                        
                                        SET  firstName = @firstName, 
                                             lastName = @lastName, 
                                             address = @address, 
                                             email = @email, 
                                             mobilePhone = @mobilePhone,
                                             age = @age, 
                                             shoeSize = @shoeSize, 
                                             clothingSizeId = @clothingSizeId,
                                             favoriteColorId = @favoriteColorId,
                                             firebaseUserId = @firebaseUserId,
                                             createdTime = @createdTime
                                            WHERE id = @id";

                    DbUtils.AddParameter(cmd, "@firstName", userProfile.firstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.lastName);
                    DbUtils.AddParameter(cmd, "@address", userProfile.address);
                    DbUtils.AddParameter(cmd, "@email", userProfile.email);
                    DbUtils.AddParameter(cmd, "@mobilePhone", userProfile.mobilePhone);
                    DbUtils.AddParameter(cmd, "@age", userProfile.age);
                    DbUtils.AddParameter(cmd, "@shoeSize", userProfile.shoeSize);
                    DbUtils.AddParameter(cmd, "@clothingSizeId", userProfile.clothingSizeId);
                    DbUtils.AddParameter(cmd, "@favoriteColorId", userProfile.favoriteColorId);
                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.firebaseUserId);
                    DbUtils.AddParameter(cmd, "@createdTime", userProfile.createdTime);

                    DbUtils.AddParameter(cmd, "@id", userProfile.id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public List<UserProfile> Search(string criterion, int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
                            SELECT distinct up.id, up.firstName, up.lastName, up.email, up.mobilePhone, up.address, up.age, 
                                   up.shoeSize, up.clothingSizeId, up.favoriteColorId, f.friendId, f.userId, f.statusId
                            FROM userProfile up
                            LEFT JOIN friend f on up.id = f.userId OR up.id = f.friendId
                           WHERE (up.firstName LIKE @Criterion OR up.lastName LIKE @Criterion) AND (f.statusId = 2 OR f.statusId =3 or f.statusId is null)
                           AND (f.friendId = @id or f.userId = @id or f.userId is null) AND (up.id != @id)
                         ORDER BY up.firstName";

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    var users = new List<UserProfile>();
                    while (reader.Read())
                    {
                        users.Add(new UserProfile()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            firstName = DbUtils.GetString(reader, "firstName"),
                            lastName = DbUtils.GetString(reader, "lastName"),
                            email = DbUtils.GetString(reader, "email"),
                            mobilePhone = DbUtils.GetString(reader, "mobilePhone"),
                            address = DbUtils.GetString(reader, "address"),
                            age = DbUtils.GetInt(reader, "age"),
                            shoeSize = DbUtils.GetInt(reader, "shoeSize"),
                            clothingSizeId = DbUtils.GetInt(reader, "clothingSizeId"),
                            favoriteColorId = DbUtils.GetInt(reader, "favoriteColorId"),
                            Friend = new Friend()
                            {
                                userId = DbUtils.GetNullableInt(reader, "userId"),
                                friendId = DbUtils.GetNullableInt(reader, "friendId"),
                                statusId = DbUtils.GetNullableInt(reader, "statusId")
                            }
                        });
                    }

                    reader.Close();

                    return users;
                }
            }
        }
    }
    }
