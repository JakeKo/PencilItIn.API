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
        public string CreateOfficeHours([FromBody] CreateOfficeHoursBody body) {
            var id = "";
            this.eventLog.RecordEvent(EventCode.CreateOfficeHours, new CreateOfficeHoursEventPayload()
            {
                Id = id,
                HostName = body.HostName,
                Title = body.Title,
                Location = body.Location,
                StartTime = body.StartTime,
                EndTime = body.EndTime
            });

            return id;
        }

        [HttpPost("{id}/bookings")]
        public string CreateBooking(string id, [FromBody] CreateBookingBody body) {
            var bookingId = "";
            this.eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload()
            {
                Id = bookingId,
                OfficeHoursId = id,
                Name = body.Name,
                StartTime = body.StartTime,
                EndTime = body.EndTime
            });

            return bookingId;
        }

        [HttpDelete("{id}")]
        public void CancelOfficeHours(string id) =>
            this.eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload() { OfficeHoursId = id });
    }
}
