import * as React from 'react';
import { createBooking, requestOfficeHours } from '../client';
import { OfficeHours, OfficeHoursComponentProps, OfficeHoursComponentStyles } from '../types';
import { minutesElapsed } from '../utilities';
import BookingComponent from './BookingComponent';
import CreateBookingFormComponent from './CreateBookingFormComponent';
import DividerComponent from './DividerComponent';

const styles: (officeHours: OfficeHours) => OfficeHoursComponentStyles = officeHours => ({
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
        height: `${2 * minutesElapsed(officeHours.startTime, officeHours.endTime)}px`,
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        border: '1px solid grey',
        boxSizing: 'border-box',
        borderRadius: '3px'
    })
});

const getDividerData: (officeHours: OfficeHours) => Date[] = officeHours => {
    // Assemble a list of times at which to draw a light divider
    // Dividers are drawn at the hour
    const times: Date[] = [];
    for (let t = officeHours.startTime; t <= officeHours.endTime; t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + 1)) {
        times.push(t);
    }

    // Calculate the minutes elapsed at each divider time
    return times;
};

/* OFFICE HOURS COMPONENT */
class OfficeHoursComponent extends React.PureComponent<OfficeHoursComponentProps> {
    readonly state: { officeHours: OfficeHours | undefined } = {
        officeHours: undefined
    };

    public componentDidMount: () => void = async () => {
        this.setState({ officeHours: await requestOfficeHours(this.props.officeHoursId) });
    }

    public render: () => JSX.Element = () => {
        if (this.state.officeHours === undefined) {
            return (<div />);
        }

        const officeHours = this.state.officeHours;
        const style = styles(officeHours);
        const dividers = getDividerData(officeHours);

        return (
            <div style={style.page()}>
                <div style={style.container()}>
                    <div style={style.heading()}>{officeHours.title}</div>
                    <div>{officeHours.hostName} ({officeHours.location})</div>

                    <CreateBookingFormComponent officeHours={officeHours} createBooking={createBooking} />

                    <div style={style.display()}>
                        {dividers.map(time => <DividerComponent key={Math.random()} officeHoursStartTime={officeHours.startTime} time={time} />)}
                        {officeHours.bookings.map(booking => <BookingComponent key={booking.id} officeHours={officeHours} booking={booking} />)}
                    </div>
                </div>
            </div>
        );
    };
}

export default OfficeHoursComponent;
