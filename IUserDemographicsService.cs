using Sabio.Models.Domain.UserDemographics;
using Sabio.Models.Requests.UserDemographicsRequests;

namespace Sabio.Services
{
    public interface IUserDemographicsService
    {
        int Add(UserDemographicsAddRequest model, int userId);
        void Delete(int id, int userId);
        UserDemographics GetById(int id);
        void Update(UserDemographicsUpdateRequest model, int userId);
    }
}