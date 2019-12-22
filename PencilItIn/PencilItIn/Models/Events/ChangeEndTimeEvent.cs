namespace PencilItIn.Models
{
    public class ChangeEndTimeEvent : IEvent<ChangeEndTimeEventPayload>
    {
        public EventCode Code { get; } = EventCode.ChangeEndTime;
        public ChangeEndTimeEventPayload Payload { get; set; }
    }
}
