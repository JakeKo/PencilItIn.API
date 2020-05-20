import * as React from 'react';
import '../style/LandingComponent.css';
import { LandingComponentProps } from '../types';
import CreateOfficeHoursComponent from './CreateOfficeHoursComponent';

class LandingComponent extends React.PureComponent<LandingComponentProps> {
    public render: () => JSX.Element = () => {
        return (
            <div className='page'>
                <CreateOfficeHoursComponent client={this.props.client} />
            </div>
        );
    };
};

export default LandingComponent;
