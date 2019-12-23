namespace PencilItIn.Models
{
    public interface IStateAssembler
    {
        SystemState AssembleState(IEventLog eventLog);
        SystemState AssembleState(IEventLog eventLog, SystemState snapshot);
    }
}
