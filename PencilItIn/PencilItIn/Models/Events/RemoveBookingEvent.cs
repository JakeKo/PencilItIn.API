namespace PencilItIn.Models
{
    public class RemoveBookingEvent : IEvent<RemoveBookingEventPayload>
    {
        public EventCode Code { get; } = EventCode.RemoveBooking;
        public RemoveBookingEventPayload Payload { get; set; }
    }
}
