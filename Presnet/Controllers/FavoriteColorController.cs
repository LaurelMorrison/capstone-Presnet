using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presnet.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Presnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoriteColorController : ControllerBase
    {
        private readonly IFavoriteColorRepository _favoriteColorRepository;
        public FavoriteColorController(IFavoriteColorRepository FavoriteColorRepository)
        {
            _favoriteColorRepository = FavoriteColorRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_favoriteColorRepository.GetAllColors());
        }


        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var color = _favoriteColorRepository.GetColorById(id);
            if (color == null)
            {
                return NotFound();
            }
            return Ok(color);
        }
    }
}
