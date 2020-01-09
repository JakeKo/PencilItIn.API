import * as React from 'react';
import { Booking } from '../store/types';

const minutesElapsed: (t1: Date, t2: Date) => number = (t1: Date, t2: Date): number => Math.abs(t1.valueOf() - t2.valueOf()) / 60000;

type BookingComponentProps = { booking: Booking, officeHoursStartTime: Date };
class BookingComponent extends React.PureComponent<BookingComponentProps> {
    private getStyle: () => React.CSSProperties = (): React.CSSProperties => ({
        position: 'absolute',
        top: `${2 * minutesElapsed(this.props.officeHoursStartTime, this.props.booking.startTime)}px`,
        height: `${2 * minutesElapsed(this.props.booking.startTime, this.props.booking.endTime)}px`,
        width: '90%',
        backgroundColor: 'pink'
    });

    public render: () => JSX.Element = (): JSX.Element => (
        <div style={this.getStyle()}>BUSY</div>
    )
};

export default BookingComponent;
