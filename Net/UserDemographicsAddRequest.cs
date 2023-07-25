using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Requests.UserDemographicsRequests
{
    public class UserDemographicsAddRequest
    {      
        public string PreferredName { get; set; }
        
        public string Pronunciation { get; set; }

        public string AboutMe { get; set; }
        [Required]
        public int GenderId { get; set; }

    }
}
