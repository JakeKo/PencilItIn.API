import * as React from 'react';
import { LandingComponentProps, LandingComponentStyles } from '../types';
import CreateOfficeHoursComponent from './CreateOfficeHoursComponent';

class LandingComponent extends React.PureComponent<LandingComponentProps> {
    private style: LandingComponentStyles = {
        page: () => ({
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        })
    };

    public render: () => JSX.Element = () => {
        const { page } = this.style;

        return (
            <div style={page()}>
                <CreateOfficeHoursComponent client={this.props.client} />
            </div>
        );
    };
};

export default LandingComponent;
