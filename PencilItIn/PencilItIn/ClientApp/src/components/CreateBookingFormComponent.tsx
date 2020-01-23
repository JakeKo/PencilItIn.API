import * as React from 'react';
import { Booking } from '../store/types';

type CreateBookingFormComponentProps = {};
type CreateBookingFormComponentStyles = {};
class CreateBookingFormComponent extends React.PureComponent<CreateBookingFormComponentProps> {
    private styles: CreateBookingFormComponentStyles = {};

    private createBooking: (event: React.FormEvent) => void = (event: React.FormEvent): void => {
        event.preventDefault();

        // Treat the form element as an array of input elements to get key-value pairs
        const [nameField, startTimeField, endTimeField]: HTMLInputElement[] = (event.target as unknown as HTMLInputElement[]);
        const booking: Booking = {
            id: 'temp_booking',
            name: nameField.value,
            // TODO: Populate date value with accurate date
            startTime: new Date(2020, 1, 1, Number(startTimeField.value.split(':')[0])),
            endTime: new Date(2020, 1, 1, Number(endTimeField.value.split(':')[0])),
            cancelled: false
        };
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
