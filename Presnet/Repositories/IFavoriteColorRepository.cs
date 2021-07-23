using Presnet.models;
using System.Collections.Generic;

namespace Presnet.Repositories
{
    public interface IFavoriteColorRepository
    {
        List<FavoriteColor> GetAllColors();
        FavoriteColor GetColorById(int id);
    }
}