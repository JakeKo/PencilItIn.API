using System;

namespace PencilItIn.Models
{
    public class CreateOfficeHoursEventPayload : IEventPayload
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string HostName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string Location { get; set; }
    }
}
