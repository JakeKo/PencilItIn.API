import * as React from 'react';
import { CreateBookingFormComponentProps, CreateBookingFormComponentStyles } from '../types';

class CreateBookingFormComponent extends React.PureComponent<CreateBookingFormComponentProps> {
    private styles: CreateBookingFormComponentStyles = {};

    private createBooking: (event: React.FormEvent) => void = event => {
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

        createBooking(this.props.officeHours, { name: nameField.value, startTime, endTime });
    };

    public render: () => JSX.Element = () => (
        <form onSubmit={this.createBooking}>
            <label htmlFor='name'>Name</label>
            <input name='name' type='text' placeholder='Name'></input>

            <label htmlFor='startTime'>Start Time</label>
            <input name='startTime' type='time' placeholder='Start Time'></input>

            <label htmlFor='endTime'>End Time</label>
            <input name='endTime' type='time' placeholder='End Time'></input>

            <button type='submit'>Submit</button>
        </form>
    );
};

export default CreateBookingFormComponent;
