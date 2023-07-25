using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.UserDemographicsRequests
{
    public class UserDemographicsUpdateRequest : UserDemographicsAddRequest, IModelIdentifier
    {
        public int Id { get; set; }
    }
}
