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
    });

    private getDashLinePositions: () => number[] = (): number[] => {
        const startTime: Date = new Date(
            this.props.officeHours!.startTime.getFullYear(),
            this.props.officeHours!.startTime.getMonth(),
            this.props.officeHours!.startTime.getDate(),
            this.props.officeHours!.startTime.getHours() + 1
        );
        const endTime: Date = new Date(
            this.props.officeHours!.endTime.getFullYear(),
            this.props.officeHours!.endTime.getMonth(),
            this.props.officeHours!.endTime.getDate(),
            this.props.officeHours!.endTime.getHours() - (this.props.officeHours!.endTime.getMinutes() === 0 ? 1 : 0)
        );

        const times: Date[] = [];
        for (let t: Date = startTime; t <= endTime; t = new Date(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours() + 1)) {
            times.push(t);
        }

        return times.map((t: Date): number => minutesElapsed(this.props.officeHours!.startTime, t));
    }

    public render: () => JSX.Element = (): JSX.Element => (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {this.props.officeHours && <div style={{ width: '500px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontFamily: 'sans-serif', fontSize: '32px' }}>{this.props.officeHours.title}</div>
                <div>{this.props.officeHours.hostName} ({this.props.officeHours.location})</div>
                <div style={this.getStyle()}>
                    {this.getDashLinePositions().map((position: number): JSX.Element =>
                        <div key={Math.random()} style={{ borderTop: '1px dashed grey', width: '100%', position: 'absolute', top: `${2 * position}px` }}></div>)}
                    {this.props.officeHours.bookings.map((booking: Booking): JSX.Element =>
                        <BookingComponent key={Math.random()} officeHoursStartTime={this.props.officeHours!.startTime} booking={booking} />)}
                </div>
            </div>}
        </div>
    );
};

export default connect((state: ApplicationState) => state.officeHours, actionCreators)(OfficeHoursComponent as any);
