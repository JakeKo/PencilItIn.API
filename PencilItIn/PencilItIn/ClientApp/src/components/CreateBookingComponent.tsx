import * as React from 'react';
import { CreateBookingComponentProps, CreateBookingComponentStyles } from '../types';

class CreateBookingComponent extends React.PureComponent<CreateBookingComponentProps> {
    private style: CreateBookingComponentStyles = {
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
    };

    private createBookingHandler: React.FormEventHandler = event => {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const [name, startDate, endDate, startTime, endTime] = form.elements as unknown as HTMLInputElement[];

        this.props.client.createBooking(this.props.officeHours.id, {
            name: name.value,
            startTime: new Date(`${startDate.value}T${startTime.value}`),
            endTime: new Date(`${endDate.value}T${endTime.value}`)
        });
    };

    public render: () => JSX.Element = () => {
        const { form, fieldWrapper, dividedFields, dividedFieldWrapper, fieldLabel, field, formButton } = this.style;
        const startDate = this.props.officeHours.startTime.toISOString().split('T')[0];
        const endDate = this.props.officeHours.endTime.toISOString().split('T')[0];

        return (
            <form onSubmit={this.createBookingHandler} style={form()}>
                <div style={fieldWrapper()}>
                    <label htmlFor='name' style={fieldLabel()}>NAME</label>
                    <input name='name' type='text' placeholder='Name' style={field()}></input>
                </div>

                <div style={dividedFields()}>
                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='startDate' style={fieldLabel()}>START DATE</label>
                        <input name='startDate' type='date' style={field()} defaultValue={startDate}></input>
                    </div>

                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='endDate' style={fieldLabel()}>END DATE</label>
                        <input name='endDate' type='date' style={field()} defaultValue={endDate}></input>
                    </div>
                </div>

                <div style={dividedFields()}>
                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='startTime' style={fieldLabel()}>START TIME</label>
                        <input name='startTime' type='time' style={field()}></input>
                    </div>

                    <div style={{ ...fieldWrapper(), ...dividedFieldWrapper() }}>
                        <label htmlFor='endTime' style={fieldLabel()}>END TIME</label>
                        <input name='endTime' type='time' style={field()}></input>
                    </div>
                </div>

                <button type='submit' style={formButton()}>SUBMIT</button>
            </form>
        );
    }
};

export default CreateBookingComponent;
