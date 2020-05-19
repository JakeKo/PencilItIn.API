import * as React from 'react';
import { Link } from 'react-router-dom';
import { createOfficeHours } from '../client';
import { LandingComponentProps } from '../types';
import CreateOfficeHoursComponent from './CreateOfficeHoursComponent';

class LandingComponent extends React.PureComponent<LandingComponentProps> {
    public render: () => JSX.Element = () => {
        return (<div>
            {this.props.officeHours.map(({ id, hostName }) => <Link key={Math.random()} to={`/office-hours/${id}`}>{hostName}</Link>)}
            <CreateOfficeHoursComponent createOfficeHours={createOfficeHours} />
        </div>);
    };
};

export default LandingComponent
