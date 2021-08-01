using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IFriendRepository
    {
        Friend AddFriend(Friend friend);        
        List<Friend> GetAllPending(int id);
        Friend GetFriendById(int friendId);
        void acceptFriend(int id);
        void RejectFriend(int id);
        void DeleteFriend(int userId, int friendId);
    }
}