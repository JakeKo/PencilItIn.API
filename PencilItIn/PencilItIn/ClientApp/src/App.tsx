import * as React from 'react';
import { Route, Switch } from 'react-router';
import OfficeHoursComponent from './components/OfficeHoursComponent';

class App extends React.PureComponent<{}> {
    public render: () => JSX.Element = () => (
        <Switch>
            <Route
                path='/office-hours/:officeHoursId'
                render={props => <OfficeHoursComponent officeHoursId={props.match.params.officeHoursId} />}
            />
        </Switch>
    );
}

export default App;
