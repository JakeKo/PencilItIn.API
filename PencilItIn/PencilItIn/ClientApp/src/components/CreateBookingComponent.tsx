import * as React from 'react';
import { CreateBookingComponentProps, CreateBookingComponentStyles } from '../types';

const styles: () => CreateBookingComponentStyles = () => ({
    form: () => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        margin: '32px 0'
    }),
    fieldWrapper: () => ({
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'monospace',
        margin: '8px'
    }),
    dividedFields: () => ({
        display: 'flex',
        width: '100%'
    }),
    dividedFieldWrapper: () => ({
        width: '50%'
    }),
    fieldLabel: () => ({
        fontSize: '12px',
        fontWeight: 'bold',
    }),
    field: () => ({
        border: '1px solid black',
        padding: '12px',
        boxSizing: 'border-box',
        fontSize: '16px'
    }),
    formButton: () => ({
        margin: '8px 8px 16px 8px',
        padding: '16px',
        background: 'black',
        border: 'none',
        color: 'white',
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        cursor: 'pointer'
    })
});

const createBookingHandler: ({ officeHours, createBooking }: CreateBookingComponentProps) => (event: React.FormEvent) => void = ({ officeHours, createBooking }) => {
    return event => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const [name, startDate, endDate, startTime, endTime] = form.elements as unknown as HTMLInputElement[];

        createBooking(officeHours.id, {
            name: name.value,
            startTime: new Date(`${startDate.value}T${startTime.value}`),
            endTime: new Date(`${endDate.value}T${endTime.value}`)
        });
    };
};

class CreateBookingComponent extends React.PureComponent<CreateBookingComponentProps> {
    public render: () => JSX.Element = () => {
        const style = styles();
        const startDate = this.props.officeHours.startTime.toISOString().split('T')[0];
        const endDate = this.props.officeHours.endTime.toISOString().split('T')[0];

        return (
            <form onSubmit={createBookingHandler(this.props)} style={style.form()}>
                <div style={style.fieldWrapper()}>
                    <label htmlFor='name' style={style.fieldLabel()}>NAME</label>
                    <input name='name' type='text' placeholder='Name' style={style.field()}></input>
                </div>

                <div style={style.dividedFields()}>
                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='startDate' style={style.fieldLabel()}>START DATE</label>
                        <input name='startDate' type='date' style={style.field()} defaultValue={startDate}></input>
                    </div>

                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='endDate' style={style.fieldLabel()}>END DATE</label>
                        <input name='endDate' type='date' style={style.field()} defaultValue={endDate}></input>
                    </div>
                </div>

                <div style={style.dividedFields()}>
                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='startTime' style={style.fieldLabel()}>START TIME</label>
                        <input name='startTime' type='time' style={style.field()}></input>
                    </div>

                    <div style={{ ...style.fieldWrapper(), ...style.dividedFieldWrapper() }}>
                        <label htmlFor='endTime' style={style.fieldLabel()}>END TIME</label>
                        <input name='endTime' type='time' style={style.field()}></input>
                    </div>
                </div>

                <button type='submit' style={style.formButton()}>SUBMIT</button>
            </form>
        );
    }
};

export default CreateBookingComponent;
