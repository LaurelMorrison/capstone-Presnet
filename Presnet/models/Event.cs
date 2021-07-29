using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.models
{
    public class Event
    {
        public int id { get; set; }
        public int userId { get; set; }
        public string eventName { get; set; }
        public string eventDetails { get; set; }
        public DateTime date { get; set; }
        public UserProfile UserProfile { get; set; }
        public UserProfile FriendProfile { get; set; }
        public FriendStatus FriendStatus { get; set; }
    }
}
