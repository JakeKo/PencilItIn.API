namespace PencilItIn.Models
{
    public class ChangeLocationEventPayload : IEventPayload
    {
        public string Location { get; set; }
    }
}
