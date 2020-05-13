import * as React from 'react';
import { Link } from 'react-router-dom';
import { LandingComponentProps } from '../types';

export default class LandingComponent extends React.PureComponent<LandingComponentProps> {
    public render: () => JSX.Element = () => {
        return (<div>
            {this.props.officeHours.map(({ id, hostName}) => <Link key={Math.random()} to={`/office-hours/${id}`}>{hostName}</Link>)}
        </div>);
    };
};
