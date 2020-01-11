import * as React from 'react';
import { Booking } from '../store/types';
import { minutesElapsed } from '../utilities';

type BookingComponentProps = { booking: Booking, officeHoursStartTime: Date };
type BookingComponentStyles = {
    block: () => React.CSSProperties
};
class BookingComponent extends React.PureComponent<BookingComponentProps> {
    private styles: BookingComponentStyles = {
        block: (): React.CSSProperties => ({
            position: 'absolute',
            top: `${2 * minutesElapsed(this.props.officeHoursStartTime, this.props.booking.startTime)}px`,
            height: `${2 * minutesElapsed(this.props.booking.startTime, this.props.booking.endTime)}px`,
            width: '95%',
            backgroundColor: 'grey',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontWeight: 800
        })
    };

    public render: () => JSX.Element = (): JSX.Element => (
        <div style={this.styles.block()}>BUSY</div>
    );
};

export default BookingComponent;
