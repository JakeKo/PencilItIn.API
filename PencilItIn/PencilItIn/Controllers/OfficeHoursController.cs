using Microsoft.AspNetCore.Mvc;
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

        public OfficeHoursController(IEventLog eventLog, IStateAssembler stateAssembler) =>
            (this.eventLog, this.stateAssembler) = (eventLog, stateAssembler);

        [HttpGet]
        public List<OfficeHours> Get() =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours;

        [HttpGet("{id}")]
        public OfficeHours Get(string id) =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours.Find(o => o.Id.Equals(id));

        [HttpPost]
        public void Post([FromBody] CreateOfficeHoursEventPayload payload) =>
            this.eventLog.RecordEvent(EventCode.CreateOfficeHours, payload);

        [HttpDelete("{id}")]
        public void Delete(string id) =>
            this.eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload()
            {
                OfficeHoursId = id,
            });
    }
}
