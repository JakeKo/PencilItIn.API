import * as React from 'react';
import { Link } from 'react-router-dom';
import { LandingComponentProps } from '../types';

export default class LandingComponent extends React.PureComponent<LandingComponentProps> {
    public render: () => JSX.Element = () => {
        return (<div>
            {this.props.officeHours.map(officeHours => <Link to={`/office-hours/${officeHours.id}`}>{officeHours.hostName}</Link>)}
        </div>);
    };
};
