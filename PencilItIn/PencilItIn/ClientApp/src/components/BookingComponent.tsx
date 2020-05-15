import * as React from 'react';
import { BookingComponentProps, BookingComponentStyles } from '../types';
import { minutesElapsed } from '../utilities';

const styles: () => BookingComponentStyles = () => ({
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
});

const handleBookingHover: React.MouseEventHandler = event => {
    console.log(event);
};

class BookingComponent extends React.PureComponent<BookingComponentProps> {
    public render: () => JSX.Element = () => {
        const style = styles();
        const { officeHours, booking } = this.props;

        return (<div style={style.block(officeHours, booking)} onMouseOver={handleBookingHover}>{booking.name}</div>);
    };
};

export default BookingComponent;
