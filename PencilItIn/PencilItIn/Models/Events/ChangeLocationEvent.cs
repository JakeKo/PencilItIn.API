namespace PencilItIn.Models
{
    public class ChangeLocationEvent : IEvent<ChangeLocationEventPayload>
    {
        public EventCode Code { get; } = EventCode.ChangeLocation;
        public ChangeLocationEventPayload Payload { get; set; }
    }
}
