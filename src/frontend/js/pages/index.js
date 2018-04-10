import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import { Provider } from 'react-redux';

import AppLayout from 'components/app-layout';
import store from 'store/store';

// External
import Index from 'components/pages/index';


// if (lastRequestUri !== '/favicon.ico') {
//     browserHistory.replace(lastRequestUri);
// }


render((
    <Provider store={store}>
        <Router>
            <AppLayout>
                <Route exact path="/" component={ Index } />
            </AppLayout>
        </Router>
    </Provider>
), document.getElementById('mount'));
