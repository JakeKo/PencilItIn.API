import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { OfficeHoursState, ApplicationState, OfficeHours } from '../store/types';
import { actionCreators } from '../store/OfficeHours';

const minutesElapsed: (t1: Date, t2: Date) => number = (t1: Date, t2: Date): number => Math.abs(t1.valueOf() - t2.valueOf()) / 60000;
const getStyle: (officeHours: OfficeHours) => React.CSSProperties = (officeHours: OfficeHours): React.CSSProperties => ({
    backgroundColor: 'blue',
    position: 'relative',
    height: `${2 * minutesElapsed(officeHours.startTime, officeHours.endTime)}px`
});
const getDividers: (o: OfficeHours) => number[] = (o: OfficeHours): number[] => o.bookings.map(b => 2 * minutesElapsed(o.startTime, b.startTime));

type OfficeHoursProps = OfficeHoursState & typeof actionCreators & RouteComponentProps<{}>;
class OfficeHoursComponent extends React.PureComponent<OfficeHoursProps> {
    public render = (): JSX.Element => (
        <React.Fragment>
            {this.props.officeHours && (
                <React.Fragment>
                    <h1>{this.props.officeHours.title}</h1>
                    <h4>{this.props.officeHours.hostName} ({this.props.officeHours.location})</h4>
                    <div style={getStyle(this.props.officeHours)}>
                        {getDividers(this.props.officeHours).map(d => (
                            <div key={Math.random()} style={{ position: 'absolute', top: `${d}px`, borderTop: `1px dashed black`, width: '100%' }}></div>
                        ))}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default connect((state: ApplicationState) => state.officeHours, actionCreators)(OfficeHoursComponent as any);
