import axios from 'axios';
import * as React from 'react';
import { BookingRequestBody, OfficeHours, OfficeHoursComponentProps, OfficeHoursComponentStyles, OfficeHoursResponseBody } from '../types';
import { minutesElapsed, responseBodyToOfficeHours } from '../utilities';
import BookingComponent from './BookingComponent';
import CreateBookingFormComponent from './CreateBookingFormComponent';

class OfficeHoursComponent extends React.PureComponent<OfficeHoursComponentProps> {
    readonly state: { officeHours: OfficeHours | undefined } = {
        officeHours: undefined
    };

    public componentDidMount: () => void = async () => {
        const { data }: { data: OfficeHoursResponseBody } = await axios({
            url: `api/v1/officehours/${this.props.officeHoursId}`,
            method: 'GET'
        });

        this.setState({ officeHours: responseBodyToOfficeHours(data) });
    }

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
            height: `${2 * minutesElapsed(this.state.officeHours!.startTime, this.state.officeHours!.endTime)}px`,
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
        const officeHours = this.state.officeHours!;

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

    private createBooking: (booking: BookingRequestBody) => void = async booking => {
        await axios({
            url: `api/v1/officehours/${this.props.officeHoursId}/bookings`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            data: booking
        });
    }

    public render: () => JSX.Element = () => {
        const { styles, createBooking, state: { officeHours } } = this;

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
}

export default OfficeHoursComponent;
