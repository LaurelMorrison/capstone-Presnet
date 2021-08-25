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
    public class EventRepository : BaseRepository, IEventRepository
    {
        public EventRepository(IConfiguration configuration) : base(configuration) { }

        public List<Event> GetAllUserEvents(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT e.id, e.eventName, e.eventDetails, e.date, e.userId, up.firstName, up.lastName
                         FROM event e
                              LEFT JOIN userProfile up ON e.userId = up.id
                         WHERE e.userId = @userId
                         ORDER BY e.date ASC";

                    DbUtils.AddParameter(cmd, "@userId", userId);
                    var reader = cmd.ExecuteReader();

                    var events = new List<Event>();

                    while (reader.Read())
                    {
                        events.Add(new Event()
                        {
                            id = DbUtils.GetInt(reader, "id"),
                            eventName = reader.GetString(reader.GetOrdinal("eventName")),
                            eventDetails = reader.GetString(reader.GetOrdinal("eventDetails")),
                            date = DbUtils.GetDateTime(reader, "date"),
                            userId = DbUtils.GetInt(reader, "userId"),
                            UserProfile = new UserProfile()
                            {
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName")
                            }

                        });
                    }
                    reader.Close();

                    return events;
                }
            }
        }

        public List<Event> GetAllFriendsEvents(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT distinct e.eventName, e.eventDetails, e.date, up.firstName, up.lastName, up.id as EventUserId, e.id, e.userId
                         FROM userProfile up
                              LEFT JOIN event e ON e.userId = up.id
                              LEFT JOIN friend f ON (f.userId = up.id OR f.friendId = up.id)
                          WHERE up.id = 1 OR up.id IN (
                                                SELECT f.friendId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.userId = @userId AND e.eventName is not null
                                                ) 
 
                                                OR up.id IN (
                                                SELECT f.userId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.friendId = @userId AND e.eventName is not null
                                                )
                         ORDER BY e.date ASC";
                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var events = new List<Event>();

                    while (reader.Read())
                    {
                        events.Add(new Event()
                        {
                            eventName = reader.GetString(reader.GetOrdinal("eventName")),
                            eventDetails = reader.GetString(reader.GetOrdinal("eventDetails")),
                            date = DbUtils.GetDateTime(reader, "date"),
                            id = DbUtils.GetInt(reader, "id"),
                            userId = DbUtils.GetInt(reader, "userId"),
                            UserProfile = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "EventUserId"),
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName")
                            }
                        }); 
                        //}
                    }
                    reader.Close();

                    return events;
                }
            }
        }

        public List<Event> GetAllUpcomingEvents(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT distinct e.eventName, e.eventDetails, e.date, up.firstName, e.id, up.id as userId, up.lastName
                         FROM userProfile up
                              LEFT JOIN event e ON e.userId = up.id
                              LEFT JOIN friend f ON (f.userId = up.id OR f.friendId = up.id) AND (f.userId = @userId OR f.friendId = @userId)
                          WHERE e.userId = @userId OR up.id = 1 OR up.id IN (
                                                SELECT f.friendId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.userId = @userId AND e.eventName is not null 
                                                ) 
                                                OR up.id IN (
                                                SELECT f.userId
                                                FROM friend f
                                                WHERE f.statusId = 1 AND f.friendId = @userId AND e.eventName is not null
                                                )
                         ORDER BY e.date ASC";
                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();

                    var events = new List<Event>();

                    while (reader.Read())
                    {
                        Event newEvent = new Event()
                        {
                            eventName = reader.GetString(reader.GetOrdinal("eventName")),
                            eventDetails = reader.GetString(reader.GetOrdinal("eventDetails")),
                            date = DbUtils.GetDateTime(reader, "date"),
                            id = DbUtils.GetInt(reader, "id"),
                            UserProfile = new UserProfile()
                            {
                                id = DbUtils.GetInt(reader, "userId"),
                                firstName = DbUtils.GetString(reader, "firstName"),
                                lastName = DbUtils.GetString(reader, "lastName")
                            }
                        };

                        if (newEvent.UserProfile.id == userId)
                        {
                            newEvent.UserProfile.firstName = "Me";
                        }

                        events.Add(newEvent);
                    }
                    
                    reader.Close();

                    return events;
                }
            }
        }

        public Event GetEventById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                         SELECT e.id, e.eventName, e.eventDetails, e.date, e.userId, up.firstName, up.lastName
                         FROM event e
                              LEFT JOIN userProfile up ON e.userId = up.id
                         WHERE e.id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);
                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        return new Event()
                        {
                            id = id,
                            eventName = DbUtils.GetString(reader, "eventName"),
                            eventDetails = DbUtils.GetString(reader, "eventDetails"),
                            date = DbUtils.GetDateTime(reader, "date"),
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


        public void AddEvent(Event holiday)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())

                {
                    cmd.CommandText = @"
                            INSERT INTO event (userId, eventName, eventDetails, date)
                            OUTPUT Inserted.id
                            VALUES (@userId, @eventName, @eventDetails, @date); ";
                    DbUtils.AddParameter(cmd, "@userId", holiday.userId);
                    DbUtils.AddParameter(cmd, "@eventName", holiday.eventName);
                    DbUtils.AddParameter(cmd, "@eventDetails", holiday.eventDetails);
                    DbUtils.AddParameter(cmd, "@date", holiday.date);

                    holiday.id = (int)cmd.ExecuteScalar();
                }

            }

        }


        public void DeleteEvent(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();

                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            DELETE Event                           
                            WHERE id = @id
                        ";

                    DbUtils.AddParameter(cmd, "@id", id);


                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void UpdateEvent(Event holiday)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE event 
                            SET
                                userId = @userId,
                                eventName = @eventName,
                                eventDetails = @eventDetails,
                                date = @date
                            WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@userId", holiday.userId);
                    DbUtils.AddParameter(cmd, "@eventName", holiday.eventName);
                    DbUtils.AddParameter(cmd, "@eventDetails", holiday.eventDetails);
                    DbUtils.AddParameter(cmd, "@date", holiday.date);

                    DbUtils.AddParameter(cmd, "@id", holiday.id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}