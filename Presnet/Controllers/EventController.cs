using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presnet.models;
using Presnet.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;


namespace Presnet.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly IEventRepository _eventRepository;
        private readonly IUserProfileRepository _userProfileRepository;

        public EventController(IEventRepository EventRepository, IUserProfileRepository UserProfileRepository)
        {
            _eventRepository = EventRepository;
            _userProfileRepository = UserProfileRepository;

        }

        [HttpGet("userevents")]
        public IActionResult GetAllUserEvents()
        {
            int currentUserProfileId = GetCurrentUserProfileId();
            var holidays = _eventRepository.GetAllUserEvents(currentUserProfileId);
            if (holidays == null)
            {
                return NotFound();
            }
            return Ok(holidays);
        }

        [HttpGet("friendevents")]
        public IActionResult GetAllFriendsEvents(int userId)
        {
            int currentUserProfileId = GetCurrentUserProfileId();
            var holidays = _eventRepository.GetAllFriendsEvents(userId);
            if (holidays == null)
            {
                return NotFound();
            }
            return Ok(holidays);
        }

        [HttpGet("{id}")]
        public IActionResult GetEventById(int id)
        {
            var holiday = _eventRepository.GetEventById(id);
            if (holiday == null)
            {
                return NotFound();
            }
            return Ok(holiday);
        }

        [HttpPost]
        public IActionResult CreatePost(Event holiday)
        {
            var currentUserProfile = GetCurrentUserProfile();
            holiday.userId = currentUserProfile.id;

            _eventRepository.AddEvent(holiday);
            return CreatedAtAction(nameof(GetAllUserEvents), new { id = holiday.id }, holiday);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Event holiday)
        {
            if (id != holiday.id)
            {
                return BadRequest();
            }
            _eventRepository.UpdateEvent(holiday);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _eventRepository.DeleteEvent(id);
            return NoContent();
        }

        private int GetCurrentUserProfileId()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            return userProfile.id;
        }

        private string GetCurrentFirebaseUserProfileId()
        {
            string id = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return id;
        }
        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
