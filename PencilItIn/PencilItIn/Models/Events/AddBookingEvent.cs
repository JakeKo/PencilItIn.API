namespace PencilItIn.Models
{
    public class AddBookingEvent : IEvent<AddBookingEventPayload>
    {
        public EventCode Code { get; } = EventCode.AddBooking;
        public AddBookingEventPayload Payload { get; set; }
    }
}
