import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
// import { Provider } from 'react-redux';

import AppLayout from 'components/app-layout';
// import store from 'store/store';

// External
// import Index from 'components/pages/index';


// if (lastRequestUri !== '/favicon.ico') {
//     browserHistory.replace(lastRequestUri);
// }

const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

render((
    <Router>
        <AppLayout>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/topic/47">Topics</Link></li>
            </ul>

            <hr />

            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topic/:topicId" component={Topic} />
        </AppLayout>
    </Router>
), document.getElementById('mount'));
