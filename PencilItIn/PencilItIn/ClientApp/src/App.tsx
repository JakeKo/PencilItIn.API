import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { requestAllOfficeHours } from './client';
import LandingComponent from './components/LandingComponent';
import OfficeHoursComponent from './components/OfficeHoursComponent';
import { OfficeHours } from './types';

export default class App extends React.PureComponent {
    readonly state: { officeHours: OfficeHours[] } = {
        officeHours: []
    }

    public componentDidMount: () => void = async () => {
        this.setState({ officeHours: await requestAllOfficeHours() });
    }

    public render: () => JSX.Element = () => {
        return (<Switch>
            <Route path='/' render={() => <LandingComponent officeHours={this.state.officeHours} />} />
            <Route path='/office-hours/:officeHoursId' render={props => <OfficeHoursComponent officeHoursId={props.match.params.officeHoursId} />} />
        </Switch>);
    }
}
