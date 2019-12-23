using Microsoft.AspNetCore.Mvc;
using PencilItIn.Logic;
using PencilItIn.Models;
using System.Collections.Generic;

namespace PencilItIn.Controllers
{
    [Route("api/v1/officehours")]
    [ApiController]
    public class OfficeHoursController : ControllerBase
    {
        [HttpGet]
        public List<OfficeHours> Get()
        {
            // TODO: Determine how to involve an application-wide EventLog
            return StateAssembler.AssembleState(new EventLog()).OfficeHours;
        }

        [HttpGet("{id}")]
        public OfficeHours Get(string id)
        {
            var state = StateAssembler.AssembleState(new EventLog());
            return state.OfficeHours.Find(o => o.Id.Equals(id));
        }

        [HttpPost]
        public void Post([FromBody] CreateOfficeHoursEventPayload payload)
        {
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CreateOfficeHours, payload);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            var eventLog = new EventLog();
            eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload()
            {
                OfficeHoursId = id,
            });
        }
    }
}
