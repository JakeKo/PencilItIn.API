import * as React from 'react';
import axios from 'axios';
import { OfficeHours } from '../store/types';

type CreateBookingFormComponentProps = {
    officeHours: OfficeHours
};
type CreateBookingFormComponentStyles = {};
class CreateBookingFormComponent extends React.PureComponent<CreateBookingFormComponentProps> {
    private styles: CreateBookingFormComponentStyles = {};

    private createBooking: (event: React.FormEvent) => void = (event: React.FormEvent): void => {
        event.preventDefault();

        // Treat the form element as an array of input elements to get key-value pairs
        const [nameField, startTimeField, endTimeField]: HTMLInputElement[] = (event.target as unknown as HTMLInputElement[]);

        const startTime: Date = new Date(this.props.officeHours.startTime);
        startTime.setUTCHours(Number(startTimeField.value.split(':')[0]));
        startTime.setUTCMinutes(Number(startTimeField.value.split(':')[1]));

        const endTime: Date = new Date(this.props.officeHours.endTime);
        endTime.setUTCHours(Number(endTimeField.value.split(':')[0]));
        endTime.setUTCMinutes(Number(endTimeField.value.split(':')[1]));

        axios({
            url: `officehours/${this.props.officeHours.id}/bookings`,
            method: 'POST',
            data: {
                name: nameField.value,
                startTime,
                endTime
            }
        }).then(console.log).catch(console.error);
    }

    public render: () => JSX.Element = (): JSX.Element => (
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
