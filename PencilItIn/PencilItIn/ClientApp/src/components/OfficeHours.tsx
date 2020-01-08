import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ApplicationState } from '../store';
import { OfficeHoursState, actionCreators } from '../store/OfficeHours';

type OfficeHoursProps = OfficeHoursState & typeof actionCreators & RouteComponentProps<{}>;
class OfficeHours extends React.PureComponent<OfficeHoursProps> {
    public render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <h1>Office Hours Component</h1>
            </React.Fragment>
        );
    }
};

export default connect((state: ApplicationState) => state.officeHours, actionCreators)(OfficeHours as any);
