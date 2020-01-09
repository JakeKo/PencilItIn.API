import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { actionCreators } from '../store/OfficeHours';
import { ApplicationState, Booking, OfficeHoursState } from '../store/types';
import BookingComponent from './BookingComponent';

const minutesElapsed: (t1: Date, t2: Date) => number = (t1: Date, t2: Date): number => Math.abs(t1.valueOf() - t2.valueOf()) / 60000;

type OfficeHoursProps = OfficeHoursState & typeof actionCreators & RouteComponentProps<{}>;
class OfficeHoursComponent extends React.PureComponent<OfficeHoursProps> {
    private getStyle: () => React.CSSProperties = (): React.CSSProperties => ({
        backgroundColor: 'blue',
        position: 'relative',
        height: `${2 * minutesElapsed(this.props.officeHours!.startTime, this.props.officeHours!.endTime)}px`
    })

    public render: () => JSX.Element = (): JSX.Element => (
        <React.Fragment>
            {this.props.officeHours && <React.Fragment>
                <h1>{this.props.officeHours.title}</h1>
                <h4>{this.props.officeHours.hostName} ({this.props.officeHours.location})</h4>
                <div style={this.getStyle()}>
                    {this.props.officeHours.bookings.map((booking: Booking): JSX.Element =>
                        <BookingComponent key={Math.random()} officeHoursStartTime={this.props.officeHours!.startTime} booking={booking} />)}
                </div>
            </React.Fragment>}
        </React.Fragment>
    );
};

export default connect((state: ApplicationState) => state.officeHours, actionCreators)(OfficeHoursComponent as any);
