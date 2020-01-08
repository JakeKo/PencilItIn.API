import 'bootstrap/dist/css/bootstrap.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history, {
    officeHours: {
        isLoading: false,
        officeHours: {
            id: 'baddd006-a022-471d-8f19-c8d56e2079ed',
            startTime: new Date(2020, 1, 1, 10, 0, 0),
            endTime: new Date(2020, 1, 1, 14, 0, 0),
            location: 'Hogwart\'s School of Witchcraft and Wizardry',
            hostName: 'Severus Snape',
            title: 'DAGA Office Hours',
            cancelled: false,
            bookings: [
                {
                    id: '1fbf097a-00d5-44fe-b2d8-422f6e80cb85',
                    startTime: new Date(2020, 1, 1, 11, 0, 0),
                    endTime: new Date(2020, 1, 1, 11, 30, 0),
                    name: 'Hermoine Granger',
                    cancelled: false
                }
            ]
        }
    }
});

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();
