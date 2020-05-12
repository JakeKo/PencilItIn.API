import * as React from 'react';
import { connect } from 'react-redux';
import { actionCreators } from '../store/OfficeHours';
import { ApplicationState, OfficeHoursComponentProps, OfficeHoursComponentStyles } from '../store/types';
import { minutesElapsed } from '../utilities';
import BookingComponent from './BookingComponent';
import CreateBookingFormComponent from './CreateBookingFormComponent';

class OfficeHoursComponent extends React.PureComponent<OfficeHoursComponentProps> {
    private styles: OfficeHoursComponentStyles = {
        page: () => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }),
        container: () => ({
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }),
        heading: () => ({
            fontFamily: 'sans-serif',
            fontSize: '32px'
        }),
        display: () => ({
            height: `${2 * minutesElapsed(this.props.officeHours!.startTime, this.props.officeHours!.endTime)}px`,
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'white',
            border: '1px solid grey',
            boxSizing: 'border-box',
            borderRadius: '3px'
        }),
        divider: position => ({
            borderTop: '1px dashed grey',
            width: '100%',
            position: 'absolute',
            top: `${2 * position}px`
        })
    };

    private dividerPositions: () => number[] = () => {
        const officeHours = this.props.officeHours!;

        const startTime = new Date(
            officeHours.startTime.getFullYear(),
            officeHours.startTime.getMonth(),
            officeHours.startTime.getDate(),
            officeHours.startTime.getHours() + 1
        );

        // Assemble a list of times at which to draw a light divider
        // Dividers are drawn at the hour
        const times: Date[] = [];
        for (let t = startTime; t < officeHours.endTime; t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + 1)) {
            times.push(t);
        }

        // Calculate the minutes elapsed at each divider time
        return times.map(t => minutesElapsed(officeHours.startTime, t));
    };

    public render: () => JSX.Element = () => {
        const { styles, props: { officeHours, createBooking } } = this;

        return (<div style={styles.page()}>
            {officeHours && <div style={styles.container()}>
                <div style={styles.heading()}>{officeHours.title}</div>
                <div>{officeHours.hostName} ({officeHours.location})</div>

                <CreateBookingFormComponent officeHours={officeHours} createBooking={createBooking} />

                <div style={styles.display()}>
                    {this.dividerPositions().map(position => <div key={Math.random()} style={styles.divider(position)}></div>)}
                    {officeHours.bookings.map(booking => <BookingComponent key={booking.id} officeHours={officeHours} booking={booking} />)}
                </div>
            </div>}
        </div>);
    };
};

export default connect((state: ApplicationState) => state.officeHours, actionCreators)(OfficeHoursComponent as any);
