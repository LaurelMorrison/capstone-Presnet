using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IEventRepository
    {
        void AddEvent(Event holiday);
        void DeleteEvent(int id);
        List<Event> GetAllFriendsEvents(int userId);
        List<Event> GetAllUserEvents(int userId);
        Event GetEventById(int id);
        void UpdateEvent(Event holiday);
    }
}