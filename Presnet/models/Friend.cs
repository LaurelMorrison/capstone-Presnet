using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.models
{
    public class Friend
    {
        public int? id { get; set; }
        public int userId { get; set; }
        public int friendId { get; set; }
        public int? statusId { get; set; }
        public UserProfile UserProfile { get; set; }
        public UserProfile FriendProfile { get; set; }
        public FriendStatus FriendStatus { get; set; }
        public FavoriteColor FavoriteColor { get; set; }
        public ClothingSize ClothingSize { get; set; }
    }
}
