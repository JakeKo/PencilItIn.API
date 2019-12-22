namespace PencilItIn.Models
{
    public class CancelOfficeHoursEvent : IEvent<CancelOfficeHoursEventPayload>
    {
        public EventCode Code { get; } = EventCode.CancelOfficeHours;
        public CancelOfficeHoursEventPayload Payload { get; set; }
    }
}
