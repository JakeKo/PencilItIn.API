import * as React from 'react';
import { BookingComponentProps, BookingComponentStyles } from '../types';
import { minutesElapsed } from '../utilities';

class BookingComponent extends React.PureComponent<BookingComponentProps> {
    private styles: BookingComponentStyles = {
        block: (): React.CSSProperties => ({
            position: 'absolute',
            top: `${2 * minutesElapsed(this.props.officeHours.startTime, this.props.booking.startTime)}px`,
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

    public render: () => JSX.Element = () => {
        const { styles } = this;

        return (<div style={styles.block()}>BUSY</div>);
    };
};

export default BookingComponent;
