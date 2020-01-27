import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { actionCreators } from '../store/OfficeHours';
import { ApplicationState, Booking, OfficeHoursActionCreators, OfficeHoursState } from '../store/types';
import { minutesElapsed } from '../utilities';
import BookingComponent from './BookingComponent';
import CreateBookingFormComponent from './CreateBookingFormComponent';

type OfficeHoursComponentProps = OfficeHoursState & OfficeHoursActionCreators & RouteComponentProps<{}>;
type OfficeHoursComponentStyles = {
    page: () => React.CSSProperties,
    container: () => React.CSSProperties,
    heading: () => React.CSSProperties,
    display: () => React.CSSProperties,
    divider: (position: number) => React.CSSProperties
};
class OfficeHoursComponent extends React.PureComponent<OfficeHoursComponentProps> {
    private styles: OfficeHoursComponentStyles = {
        page: (): React.CSSProperties => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }),
        container: (): React.CSSProperties => ({
            width: '500px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }),
        heading: (): React.CSSProperties => ({
            fontFamily: 'sans-serif',
            fontSize: '32px'
        }),
        display: (): React.CSSProperties => ({
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
        divider: (position: number): React.CSSProperties => ({
            borderTop: '1px dashed grey',
            width: '100%',
            position: 'absolute',
            top: `${2 * position}px`
        })
    };

    private dividerPositions: () => number[] = (): number[] => {
        const startTime: Date = new Date(
            this.props.officeHours!.startTime.getFullYear(),
            this.props.officeHours!.startTime.getMonth(),
            this.props.officeHours!.startTime.getDate(),
            this.props.officeHours!.startTime.getHours() + 1
        );

        const times: Date[] = [];
        for (let t: Date = startTime; t < this.props.officeHours!.endTime; t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + 1)) {
            times.push(t);
        }

        return times.map((t: Date): number => minutesElapsed(this.props.officeHours!.startTime, t));
    };

    public render: () => JSX.Element = (): JSX.Element => (
        <div style={this.styles.page()}>
            {this.props.officeHours && <div style={this.styles.container()}>
                <div style={this.styles.heading()}>{this.props.officeHours.title}</div>
                <div>{this.props.officeHours.hostName} ({this.props.officeHours.location})</div>
                <CreateBookingFormComponent officeHours={this.props.officeHours} createBooking={this.props.createBooking} />
                <div style={this.styles.display()}>
                    {this.dividerPositions().map((position: number): JSX.Element => <div key={Math.random()} style={this.styles.divider(position)}></div>)}
                    {this.props.officeHours.bookings.map((booking: Booking): JSX.Element =>
                        <BookingComponent key={booking.id} officeHoursStartTime={this.props.officeHours!.startTime} booking={booking} />)}
                </div>
            </div>}
        </div>
    );
};

export default connect((state: ApplicationState) => state.officeHours, actionCreators)(OfficeHoursComponent as any);
