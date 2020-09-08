using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;

namespace name_app.Controllers
{
    [ApiController]
    [Route("[controller]/{action}")]
    public class NameController : ControllerBase
    {
        private readonly ILogger<NameController> _logger;
        private readonly NamesContext _context;

        public NameController(ILogger<NameController> logger, NamesContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public IEnumerable<Name> GetAll()
        {
            return _context.Names.ToList();
        }

        [HttpPost]
        public string ReturnNameGuid([FromBody] Name lookup)
        {
            return _context.RunGetGuidOfUserAndCreateIfNotInDatabase(lookup).ID.ToString();
        }

        [HttpGet]
        public string[] AllGuidsThatMatchName(string mode, string name)
        {
            return _context.RunGetAllUsersThatMatchFirstSetOfCharacters(mode, name).Select(n => n.ID.ToString()).ToArray();
        }
    }
}