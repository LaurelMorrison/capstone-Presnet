using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
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
    public class FriendController : ControllerBase
    {
        private readonly IFriendRepository _friendRepository;
        private readonly IUserProfileRepository _userProfileRepository;
        public FriendController(IFriendRepository FriendRepository, IUserProfileRepository UserProfileRepository)
        {
            _friendRepository = FriendRepository;
            _userProfileRepository = UserProfileRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_friendRepository.GetAllFriends());
        }

        [HttpGet]
        public IActionResult GetPending(int id)
        {
            var friends = _friendRepository.GetAllPending(id);
            if (friends == null)
            {
                return NotFound();
            }
            return Ok(friends);
        }

        [HttpGet]
        public IActionResult GetRequested(int id)
        {
            var friends = _friendRepository.GetAllRequested(id);
            if (friends == null)
            {
                return NotFound();
            }
            return Ok(friends);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_friendRepository.GetAllFriends());
        }

        [HttpGet("Id")]
        public IActionResult GetById(int id)
        {
            var friend = _friendRepository.GetFriendById(id);
            if (friend == null)
            {
                return NotFound();
            }
            return Ok(friend);
        }

        [HttpPost]
        public IActionResult addFriend(Friend friend)
        {
            var currentUserProfile = GetCurrentUserProfile();
            friend.userId = currentUserProfile.id;

            _friendRepository.AddFriend(friend);
            return CreatedAtAction(nameof(GetAll), new { id = friend.id }, friend);
        }

        [HttpPost]
        public IActionResult addFriendStatus(FriendStatus friendStatus)
        {
            var currentUserProfile = GetCurrentUserProfile();
            friendStatus.status = "pending";

            _friendRepository.AddFriendStatus(friendStatus);
            return CreatedAtAction(nameof(GetAll), new { id = friendStatus.id }, friendStatus);
        }

        private UserProfile GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }

        // Accept Friend
        [HttpPut("{id}")]
        public IActionResult AcceptFriendRequest(int id, Friend friend)
        {
            if (id != friend.id)
            {
                return BadRequest();
            }
            _friendRepository.acceptFriend(id);
            return NoContent();
        }

        // Accept Friend
        [HttpPut("{id}")]
        public IActionResult RejectFriendRequest(int id, Friend friend)
        {
            if (id != friend.id)
            {
                return BadRequest();
            }
            _friendRepository.RejectFriend(id);
            return NoContent();
        }
    }
}
