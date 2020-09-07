using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace name_app.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NameController : ControllerBase
    {
        private readonly ILogger<NameController> _logger;
        
        public NameController(ILogger<NameController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public Name Get()
        {
            var rtnVal = new Name()
            {
                First = "Brian",
                Last = "Katchmar"
            };

            return rtnVal;
        }
    }
}