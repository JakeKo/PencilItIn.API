namespace PencilItIn.Models
{
    public class ConfigureOfficeHoursEventPayload : IEventPayload
    {
        public string OfficeHoursId { get; set; }
        public int MinBookingLength { get; set; }
        public int MaxBookingLength { get; set; }
        public bool PermitMultipleBookings { get; set; }
    }
}
