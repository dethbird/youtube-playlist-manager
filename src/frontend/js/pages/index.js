import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
// import { Provider } from 'react-redux';

// import App from 'components/app';
// import store from 'store/store';

// External
// import Index from 'components/pages/index';


// if (lastRequestUri !== '/favicon.ico') {
//     browserHistory.replace(lastRequestUri);
// }

render((
    <div>farts</div>
), document.getElementById('mount'));

// render((
//     <Provider store={ store }>
//         <Router history={ browserHistory } onUpdate={ logPageView }>
//             <Route path="/" component={ App } props={ { securityContext } }>
//                 <IndexRoute component={ Index } props={ { securityContext } } />

//                 /** external */
//                 <Route path="playlists" component={ Playlists } props={ { securityContext } } />

//                 <Route path="*" component={ Index } props={ { securityContext } } />
//             </Route>
//         </Router>
//     </Provider>
// ), document.getElementById('mount'));
