import * as React from 'react';
import { OfficeHours, OfficeHoursComponentProps, OfficeHoursComponentStyles } from '../types';
import { minutesElapsed } from '../utilities';
import BookingComponent from './BookingComponent';
import CreateBookingComponent from './CreateBookingComponent';
import DividerComponent from './DividerComponent';

class OfficeHoursComponent extends React.PureComponent<OfficeHoursComponentProps> {
    readonly state: { officeHours: OfficeHours | undefined } = {
        officeHours: undefined
    };

    private style: OfficeHoursComponentStyles = {
        page: () => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '32px'
        }),
        container: () => ({
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }),
        heading: () => ({
            fontFamily: 'monospace',
            fontSize: '32px',
            fontWeight: 'bold'
        }),
        subheading: () => ({
            fontFamily: 'monospace',
            fontSize: '16px',
            textAlign: 'center'
        }),
        display: officeHours => ({
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
    };

    public componentDidMount: () => void = async () => {
        this.setState({ officeHours: await this.props.client.requestOfficeHours(this.props.officeHoursId) });
    };

    private getDividerData: (officeHours: OfficeHours) => Date[] = officeHours => {
        // Assemble a list of times at which to draw a light divider
        // Dividers are drawn at the hour
        const times: Date[] = [];
        for (let t = officeHours.startTime; t < officeHours.endTime; t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + 1)) {
            times.push(t);
        }

        // Calculate the minutes elapsed at each divider time
        return times;
    };

    public render: () => JSX.Element = () => {
        if (this.state.officeHours === undefined) {
            return (<div />);
        }

        const officeHours = this.state.officeHours;
        const { page, container, heading, subheading, display } = this.style;
        const dividers = this.getDividerData(officeHours);

        return (
            <div style={page()}>
                <div style={container()}>
                    <div style={heading()}>{officeHours.title}</div>
                    <div style={subheading()}>{officeHours.hostName}<br />({officeHours.location})</div>

                    <CreateBookingComponent officeHours={officeHours} client={this.props.client} />

                    <div style={display(officeHours)}>
                        {dividers.map(time => <DividerComponent key={Math.random()} officeHoursStartTime={officeHours.startTime} time={time} />)}
                        {officeHours.bookings.map(booking => <BookingComponent key={booking.id} officeHours={officeHours} booking={booking} />)}
                    </div>
                </div>
            </div>
        );
    };
}

export default OfficeHoursComponent;
