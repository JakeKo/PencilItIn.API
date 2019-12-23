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
        private readonly IEventLog eventLog;
        private readonly IStateAssembler stateAssembler;

        public OfficeHoursController(IEventLog eventLog)
        {
            this.eventLog = eventLog;
        }

        [HttpGet]
        public List<OfficeHours> Get()
        {
            return this.stateAssembler.AssembleState(this.eventLog)
                .OfficeHours;
        }

        [HttpGet("{id}")]
        public OfficeHours Get(string id)
        {
            return this.stateAssembler.AssembleState(this.eventLog)
                .OfficeHours.Find(o => o.Id.Equals(id));
        }

        [HttpPost]
        public void Post([FromBody] CreateOfficeHoursEventPayload payload)
        {
            this.eventLog.RecordEvent(EventCode.CreateOfficeHours, payload);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            this.eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload()
            {
                OfficeHoursId = id,
            });
        }
    }
}
