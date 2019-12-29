namespace PencilItIn.Models
{
    public class Event
    {
        public EventCode Code { get; set; }
        public IEventPayload Payload { get; set; }
    }
}
