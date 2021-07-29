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
    public class WishListRepository : BaseRepository, IWishListRepository
    {
        public WishListRepository(IConfiguration configuration) : base(configuration) { }

        public List<WishListItem> GetUserWishlist(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT wl.id, wl.gift, wl.giftURL, wl.userId, up.firstName, up.lastName
                         FROM wishListItem wl
                              LEFT JOIN userProfile up ON wl.userId = up.id
                         WHERE wl.userId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    var reader = cmd.ExecuteReader();

                    var gifts = new List<WishListItem>();

                    while (reader.Read())
                    {
                        gifts.Add(new WishListItem()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            gift = reader.GetString(reader.GetOrdinal("gift")),
                            giftURL = reader.GetString(reader.GetOrdinal("giftURL")),
                            userId = DbUtils.GetInt(reader, "userId"),
                            UserProfile = new UserProfile()
                            {
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName")
                            }

                        });
                    }
                    reader.Close();

                    return gifts;
                }
            }
        }

        public WishListItem GetGiftById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT wl.id, wl.gift, wl.giftURL, wl.userId, up.firstName, up.lastName
                         FROM wishListItem wl
                              LEFT JOIN userProfile up ON wl.userId = up.id
                         WHERE wl.id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return new WishListItem()
                        {
                            id = id,
                            gift = DbUtils.GetString(reader, "gift"),
                            giftURL = DbUtils.GetString(reader, "giftURL"),
                            userId = DbUtils.GetInt(reader, "userId"),
                            UserProfile = new UserProfile()
                            {
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName")
                            }
                        };
                    }
                    reader.Close();

                    return null;
                }
            }
        }


        public void AddGift(WishListItem gift)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())

                {
                    cmd.CommandText = @"
                            INSERT INTO wishListItem (userId, gift, giftURL)
                            OUTPUT Inserted.id
                            VALUES (@userId, @gift, @giftURL); ";
                    cmd.Parameters.AddWithValue("@userId", gift.userId);
                    cmd.Parameters.AddWithValue("@eventName", gift.gift);
                    cmd.Parameters.AddWithValue("@eventDetails", gift.giftURL);

                    int id = (int)cmd.ExecuteScalar();

                    gift.id = id;
                }

            }

        }

        public void DeleteGift(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE wishListItem                           
                            WHERE id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateGift(WishListItem gift)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE wishListItem 
                            SET
                                userId = @userId,
                                gift = @gift,
                                giftURL = @giftURL,
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@userId", gift.userId);
                    DbUtils.AddParameter(cmd, "@eventName", gift.gift);
                    DbUtils.AddParameter(cmd, "@eventDetails", gift.giftURL);

                    DbUtils.AddParameter(cmd, "@id", gift.id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}