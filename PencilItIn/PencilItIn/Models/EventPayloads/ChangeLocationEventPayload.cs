namespace PencilItIn.Models
{
    public class ChangeLocationEventPayload : IEventPayload
    {
        public string OfficeHoursId { get; set; }
        public string Location { get; set; }
    }
}
