using System;

namespace PencilItIn.Models
{
    public class CancelBookingEventPayload : IEventPayload
    {
        public string OfficeHoursId { get; set; }
        public string BookingId { get; set; }
    }
}
