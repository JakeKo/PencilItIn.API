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
        public List<OfficeHours> GetAllOfficeHours() =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours;

        [HttpGet("{id}")]
        public OfficeHours GetOfficeHours(string id) =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours.Find(o => o.Id.Equals(id));

        [HttpGet("{id}/bookings")]
        public List<Booking> GetAllBookings(string id) =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours.Find(o => o.Id.Equals(id)).Bookings;

        [HttpGet("{officeHoursId}/bookings/{bookingId}")]
        public Booking GetBooking(string officeHoursId, string bookingId) =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours.Find(o => o.Id.Equals(officeHoursId)).Bookings.Find(b => b.Id.Equals(bookingId));

        [HttpPost]
        public void CreateOfficeHours([FromBody] CreateOfficeHoursEventPayload payload) =>
            this.eventLog.RecordEvent(EventCode.CreateOfficeHours, payload);

        [HttpDelete("{id}")]
        public void CancelOfficeHours(string id) =>
            this.eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload() { OfficeHoursId = id });
    }
}
