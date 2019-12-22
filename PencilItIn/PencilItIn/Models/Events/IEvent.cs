namespace PencilItIn.Models
{
    public interface IEvent<T>
    {
        public EventCode Code { get; }
        public T Payload { get; set; }
    }
}
