using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.models
{
    public class WishListItem
    {
        public int id { get; set; }
        public string gift { get; set; }
        public int userId { get; set; }
        public string giftURL { get; set; }
        public UserProfile UserProfile { get; set; }

    }
}
