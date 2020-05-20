import * as React from 'react';
import { OfficeHours, OfficeHoursComponentProps } from '../types';
import { minutesElapsed } from '../utilities';
import BookingComponent from './BookingComponent';
import CreateBookingComponent from './CreateBookingComponent';
import DividerComponent from './DividerComponent';
import '../style/OfficeHoursComponent.css';

class OfficeHoursComponent extends React.PureComponent<OfficeHoursComponentProps> {
    readonly state: { officeHours: OfficeHours | undefined } = {
        officeHours: undefined
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
        const dividers = this.getDividerData(officeHours);

        return (
            <div className='page'>
                <div className='container'>
                    <div className='heading'>{officeHours.title}</div>
                    <div className='subheading'>{officeHours.hostName}<br />({officeHours.location})</div>

                    <CreateBookingComponent officeHours={officeHours} client={this.props.client} />

                    <div className='display' style={{ height: `${2 * minutesElapsed(officeHours.startTime, officeHours.endTime)}px` }}>
                        {dividers.map(time => <DividerComponent key={Math.random()} officeHoursStartTime={officeHours.startTime} time={time} />)}
                        {officeHours.bookings.map(booking => <BookingComponent key={booking.id} officeHours={officeHours} booking={booking} />)}
                    </div>
                </div>
            </div>
        );
    };
}

export default OfficeHoursComponent;
