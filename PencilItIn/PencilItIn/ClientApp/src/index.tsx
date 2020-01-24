import axios, { AxiosResponse } from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { Booking } from './store/types';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

axios({
    url: 'api/v1/officehours',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    data: {
        startTime: new Date(2020, 1, 1, 10, 15, 0),
        endTime: new Date(2020, 1, 1, 14, 30, 0),
        location: 'Hogwart\'s School of Witchcraft and Wizardry',
        hostName: 'Severus Snape',
        title: 'DAGA Office Hours'
    }
}).then(async (response: AxiosResponse<string>): Promise<void> => {
    axios({
        url: `api/v1/officehours/${response.data}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Hermoine Granger',
            startTime: new Date(2020, 1, 1, 11, 0, 0),
            endTime: new Date(2020, 1, 1, 11, 30, 0)
        }
    });

    axios({
        url: `api/v1/officehours/${response.data}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Hermoine Granger',
            startTime: new Date(2020, 1, 1, 11, 30, 0),
            endTime: new Date(2020, 1, 1, 12, 30, 0)
        }
    });

    axios({
        url: `api/v1/officehours/${response.data}/bookings`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        data: {
            name: 'Hermoine Granger',
            startTime: new Date(2020, 1, 1, 13, 0, 0),
            endTime: new Date(2020, 1, 1, 13, 30, 0)
        }
    });

    const { data }: { data: any } = await axios({
        url: `api/v1/officehours/${response.data}`,
        method: 'GET'
    });

    // Get the application-wide store instance, prepopulating with state from the server where available.
    const store = configureStore(history, {
        officeHours: {
            isLoading: false,
            officeHours: {
                id: data.id,
                title: data.title,
                hostName: data.hostName,
                location: data.location,
                cancelled: data.cancelled,
                startTime: new Date(data.startTime),
                endTime: new Date(data.endTime),
                bookings: data.bookings.map((b: any): Booking => ({
                    id: b.id,
                    name: b.name,
                    cancelled: b.cancelled,
                    startTime: new Date(b.startTime),
                    endTime: new Date(b.endTime)
                }))
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
});
