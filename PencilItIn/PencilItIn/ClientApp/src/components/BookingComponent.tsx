import * as React from 'react';
import { BookingComponentProps, BookingComponentStyles } from '../types';
import { minutesElapsed } from '../utilities';

class BookingComponent extends React.PureComponent<BookingComponentProps> {
    private style: BookingComponentStyles = {
        block: (officeHours, booking): React.CSSProperties => ({
            position: 'absolute',
            top: `${2 * minutesElapsed(officeHours.startTime, booking.startTime)}px`,
            height: `${2 * minutesElapsed(booking.startTime, booking.endTime)}px`,
            width: '95%',
            backgroundColor: 'white',
            border: '2px solid black',
            display: 'flex',
            fontFamily: 'monospace',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: 'bold',
            cursor: 'pointer'
        })
    };

    private handleBookingHover: React.MouseEventHandler = event => {
        console.log(event);
    };

    public render: () => JSX.Element = () => {
        const { block } = this.style;
        const { officeHours, booking } = this.props;

        return (
            <div style={block(officeHours, booking)} onMouseOver={this.handleBookingHover}>{booking.name}</div>
        );
    };
};

export default BookingComponent;
