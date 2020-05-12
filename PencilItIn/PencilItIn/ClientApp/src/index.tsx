import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import { seedData, responseBodyToOfficeHours } from './utilities';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;
const history = createBrowserHistory({ basename: baseUrl });

seedData().then(async (): Promise<void> => {
    // Get the application-wide store instance, prepopulating with state from the server where available.
    const store = configureStore(history, {
        officeHours: {
            isLoading: true,
            officeHours: responseBodyToOfficeHours((await axios({
                url: 'api/v1/officehours',
                method: 'GET'
            })).data[0])
        }
    });

    console.log(store.getState());

    ReactDOM.render(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App />
            </ConnectedRouter>
        </Provider>,
        document.getElementById('root')
    );

    registerServiceWorker();
});

