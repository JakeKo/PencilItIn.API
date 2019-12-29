namespace PencilItIn.Models
{
    public class CancelOfficeHoursEventPayload : IEventPayload
    {
        public string OfficeHoursId { get; set; }
    }
}
