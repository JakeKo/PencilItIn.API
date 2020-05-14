import * as React from 'react';
import { Booking, BookingComponentProps, BookingComponentStyles, OfficeHours } from '../types';
import { minutesElapsed } from '../utilities';

const styles: (officeHours: OfficeHours, booking: Booking) => BookingComponentStyles = (officeHours, booking) => ({
    block: (): React.CSSProperties => ({
        position: 'absolute',
        top: `${2 * minutesElapsed(officeHours.startTime, booking.startTime)}px`,
        height: `${2 * minutesElapsed(booking.startTime, booking.endTime)}px`,
        width: '95%',
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 800
    })
});

class BookingComponent extends React.PureComponent<BookingComponentProps> {
    public render: () => JSX.Element = () => {
        const style = styles(this.props.officeHours, this.props.booking);
        return (<div style={style.block()}>BUSY</div>);
    };
};

export default BookingComponent;
