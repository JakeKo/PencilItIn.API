using Microsoft.AspNetCore.Mvc;
using PencilItIn.Models;
using System.Collections.Generic;

namespace PencilItIn.Controllers
{
    [Route("api/v1")]
    [ApiController]
    public class OfficeHoursController : ControllerBase
    {
        private readonly IEventLog eventLog;
        private readonly IStateAssembler stateAssembler;
        private readonly IIdProvider idProvider;

        public OfficeHoursController(IEventLog eventLog, IStateAssembler stateAssembler, IIdProvider idProvider) =>
            (this.eventLog, this.stateAssembler, this.idProvider) = (eventLog, stateAssembler, idProvider);

        [HttpGet("officehours")]
        public List<OfficeHours> GetAllOfficeHours() =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours;

        [HttpGet("officehours/{officeHoursId}")]
        public OfficeHours GetOfficeHours(string officeHoursId) =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours.Find(o => o.Id.Equals(officeHoursId));

        [HttpGet("officehours/{officeHoursId}/bookings")]
        public List<Booking> GetAllBookings(string officeHoursId) =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours.Find(o => o.Id.Equals(officeHoursId)).Bookings;

        [HttpGet("officehours/{officeHoursId}/bookings/{bookingId}")]
        public Booking GetBooking(string officeHoursId, string bookingId) =>
            this.stateAssembler.AssembleState(this.eventLog).OfficeHours.Find(o => o.Id.Equals(officeHoursId)).Bookings.Find(b => b.Id.Equals(bookingId));

        [HttpPost("officehours")]
        public string CreateOfficeHours([FromBody] CreateOfficeHoursBody body)
        {
            var id = this.idProvider.ProvideId();
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

        [HttpPost("officehours/{officeHoursId}/bookings")]
        public string CreateBooking(string officeHoursId, [FromBody] CreateBookingBody body)
        {
            var bookingId = this.idProvider.ProvideId();
            this.eventLog.RecordEvent(EventCode.CreateBooking, new CreateBookingEventPayload()
            {
                Id = bookingId,
                OfficeHoursId = officeHoursId,
                Name = body.Name,
                StartTime = body.StartTime,
                EndTime = body.EndTime
            });

            return bookingId;
        }

        [HttpDelete("officehours/{officeHoursId}")]
        public void CancelOfficeHours(string officeHoursId) =>
            this.eventLog.RecordEvent(EventCode.CancelOfficeHours, new CancelOfficeHoursEventPayload() { OfficeHoursId = officeHoursId });

        [HttpDelete("officehours/{officeHoursId}/bookings/{bookingId}")]
        public void CancelBooking(string officeHoursId, string bookingId) =>
            this.eventLog.RecordEvent(EventCode.CancelBooking, new CancelBookingEventPayload() { OfficeHoursId = officeHoursId, BookingId = bookingId });
    }
}
