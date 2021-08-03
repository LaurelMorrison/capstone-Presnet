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
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository UserProfileRepository)
        {
            _userProfileRepository = UserProfileRepository;
        }

        [HttpGet("firebase/{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userProfileRepository.GetAllUsers());
        }

        [HttpGet("friendList")]
        public IActionResult GetAllFriends()
        {
            var user = GetCurrentUserProfile();
            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var friends = _userProfileRepository.GetAllFriends(user.id);

                return Ok(friends);
            }
        }

        [HttpGet("userList")]
        public IActionResult GetNonFriends()
        {
            var user = GetCurrentUserProfile();

            if (user == null)
            {
                return Unauthorized();
            }
            else
            {
                var nonfriends = _userProfileRepository.GetAllNonFriend(user.id);

                return Ok(nonfriends);
            }
        }


        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _userProfileRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("search")]
        public IActionResult Search(string query)
        {
            var userId = GetCurrentUserProfileId();

            return Ok(_userProfileRepository.Search(query, userId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Register(UserProfile userProfile)
        {
            // All newly registered users start out as a "user" user type (i.e. they are not admins)
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId), new { firebaseUserId = userProfile.firebaseUserId }, userProfile);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, UserProfile user)
        {
            if (id != user.id)
            {
                return BadRequest();
            }

            _userProfileRepository.Update(user);
            return NoContent();
        }

        [HttpGet("account")]
        public IActionResult GetUserProfileId()
        {
            var userProfile = GetCurrentUserProfile();
            return Ok(userProfile);
        }



        // Get the current user
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
