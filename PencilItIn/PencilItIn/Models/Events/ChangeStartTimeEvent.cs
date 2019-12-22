namespace PencilItIn.Models
{
    public class ChangeStartTimeEvent : IEvent<ChangeStartTimeEventPayload>
    {
        public EventCode Code { get; } = EventCode.ChangeStartTime;
        public ChangeStartTimeEventPayload Payload { get; set; }
    }
}
