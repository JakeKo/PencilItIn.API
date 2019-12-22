namespace PencilItIn.Models
{
    public class ConfigureOfficeHoursEvent : IEvent<ConfigureOfficeHoursEventPayload>
    {
        public EventCode Code { get; } = EventCode.ConfigureOfficeHours;
        public ConfigureOfficeHoursEventPayload Payload { get; set; }
    }
}
