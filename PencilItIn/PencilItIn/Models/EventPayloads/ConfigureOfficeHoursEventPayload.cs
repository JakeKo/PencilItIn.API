namespace PencilItIn.Models
{
    public class ConfigureOfficeHoursEventPayload : IEventPayload
    {
        public int MinBookingLength { get; set; }
        public int MaxBookingLength { get; set; }
        public bool PermitMultipleBookings { get; set; }
    }
}
