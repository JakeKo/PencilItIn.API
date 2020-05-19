import * as React from 'react';
import { Link } from 'react-router-dom';
import { LandingComponentProps } from '../types';
import CreateOfficeHoursComponent from './CreateOfficeHoursComponent';

class LandingComponent extends React.PureComponent<LandingComponentProps> {
    public render: () => JSX.Element = () => {
        const { officeHours, client } = this.props;

        return (
            <div>
                {officeHours.map(({ id, hostName }) => <Link key={Math.random()} to={`/office-hours/${id}`}>{hostName}</Link>)}
                <CreateOfficeHoursComponent client={client} />
            </div>
        );
    };
};

export default LandingComponent;
