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
        private readonly IEventLog _eventLog;

        public OfficeHoursController(IEventLog eventLog)
        {
            this._eventLog = eventLog;
        }

        [HttpGet]
        public List<OfficeHours> Get()
        {
            return StateAssembler.AssembleState(this._eventLog).OfficeHours;
        }

        [HttpGet("{id}")]
        public OfficeHours Get(string id)
        {
            return StateAssembler.AssembleState(this._eventLog).OfficeHours.Find(o => o.Id.Equals(id));
        }

        [HttpPost]
        public void Post([FromBody] CreateOfficeHoursEventPayload payload)
        {
            this._eventLog.RecordEvent(EventCode.CreateOfficeHours, payload);
        }

        [HttpDelete("{id}")]
        public void Delete(string id)
        {
            this._eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload()
            {
                OfficeHoursId = id,
            });
        }
    }
}
