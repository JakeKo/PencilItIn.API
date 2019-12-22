namespace PencilItIn.Models
{
    public class CreateOfficeHoursEvent : IEvent<CreateOfficeHoursEventPayload>
    {
        public EventCode Code { get; } = EventCode.CreateOfficeHours;
        public CreateOfficeHoursEventPayload Payload { get; set; }
    }
}
