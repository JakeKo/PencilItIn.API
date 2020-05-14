import * as React from 'react';
import { CreateBookingFormComponentProps, CreateBookingFormComponentStyles } from '../types';

const styles: () => CreateBookingFormComponentStyles = () => ({
    form: () => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    }),
    fieldWrapper: () => ({
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'sans-serif',
        margin: '8px'
    }),
    timeFields: () => ({
        display: 'flex',
        width: '100%'
    }),
    timeFieldWrapper: () => ({
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
        fontWeight: 'bold'
    })
});

class CreateBookingFormComponent extends React.PureComponent<CreateBookingFormComponentProps> {
    private createBookingHandler: (event: React.FormEvent) => void = event => {
        const { officeHours, createBooking } = this.props;
        event.preventDefault();

        // Treat the form element as an array of input elements to get key-value pairs
        const [nameField, startTimeField, endTimeField] = (event.target as unknown as HTMLInputElement[]);

        const startTime: Date = new Date(officeHours.startTime.valueOf());
        startTime.setUTCHours(Number(startTimeField.value.split(':')[0]));
        startTime.setUTCMinutes(Number(startTimeField.value.split(':')[1]));

        const endTime: Date = new Date(officeHours.endTime.valueOf());
        endTime.setUTCHours(Number(endTimeField.value.split(':')[0]));
        endTime.setUTCMinutes(Number(endTimeField.value.split(':')[1]));

        createBooking(this.props.officeHours.id, { name: nameField.value, startTime, endTime });
    };

    public render: () => JSX.Element = () => {
        const style = styles();

        return (
            <form onSubmit={this.createBookingHandler} style={style.form()}>
                <div style={style.fieldWrapper()}>
                    <label htmlFor='name' style={style.fieldLabel()}>NAME</label>
                    <input name='name' type='text' placeholder='Name' style={style.field()}></input>
                </div>

                <div style={style.timeFields()}>
                    <div style={{ ...style.fieldWrapper(), ...style.timeFieldWrapper() }}>
                        <label htmlFor='startTime' style={style.fieldLabel()}>APPOINTMENT START</label>
                        <input name='startTime' type='time' style={style.field()}></input>
                    </div>

                    <div style={{ ...style.fieldWrapper(), ...style.timeFieldWrapper() }}>
                        <label htmlFor='endTime' style={style.fieldLabel()}>APPOINTMENT END</label>
                        <input name='endTime' type='time' style={style.field()}></input>
                    </div>
                </div>

                <button type='submit' style={style.formButton()}>SUBMIT</button>
            </form>
        );
    }
};

export default CreateBookingFormComponent;
