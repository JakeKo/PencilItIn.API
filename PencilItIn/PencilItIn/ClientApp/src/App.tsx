import * as React from 'react';
import { Route, RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import Client from './client';
import LandingComponent from './components/LandingComponent';
import OfficeHoursComponent from './components/OfficeHoursComponent';
import './style/App.css';

class App extends React.PureComponent<RouteComponentProps> {
    public render: () => JSX.Element = () => {
        return (
            <React.Fragment>
                <Switch>
                    <Route exact path='/' render={() => <LandingComponent client={Client} />} />
                    <Route path='/office-hours/:id' render={props => <OfficeHoursComponent officeHoursId={props.match.params.id} client={Client} />} />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withRouter(App)
