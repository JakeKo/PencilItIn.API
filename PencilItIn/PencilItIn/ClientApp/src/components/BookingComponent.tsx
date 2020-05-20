import * as React from 'react';
import '../style/BookingComponent.css';
import { BookingComponentProps } from '../types';
import { minutesElapsed } from '../utilities';

class BookingComponent extends React.PureComponent<BookingComponentProps> {
    private handleBookingHover: React.MouseEventHandler = event => {
        console.log(event);
    };

    public render: () => JSX.Element = () => {
        const { officeHours, booking } = this.props;

        return (
            <div className='block' onMouseOver={this.handleBookingHover} style={{
                top: `${2 * minutesElapsed(officeHours.startTime, booking.startTime)}px`,
                height: `${2 * minutesElapsed(booking.startTime, booking.endTime)}px`
            }} >{booking.name}</div>
        );
    };
};

export default BookingComponent;
