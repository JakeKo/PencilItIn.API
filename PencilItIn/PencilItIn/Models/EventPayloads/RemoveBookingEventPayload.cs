using System;

namespace PencilItIn.Models
{
    public class RemoveBookingEventPayload : IEventPayload
    {
        public string OfficeHoursId { get; set; }
        public string BookingId { get; set; }
    }
}
