import React from 'react';
import {Router, Route, IndexRoute, Redirect} from 'react-router';
import Raven from 'raven-js';
import {history} from './store.js';
import ListViewContainer from './components/list_view/ListViewContainer/';
import SettingsPage from './components/settings_page/SettingsPageContainer/';
import MainContainer from './components/app_level/MainContainer';
import MyListsPage from './components/my_lists_page/MyListsPage/';

if (process.env.NODE_ENV === "production") {
  Raven
    .config(`https://${process.env.SENTRY_KEY}@sentry.io/274854`)
    .install();
}

function App() {
  return (
    <div>
      <Router history={history}>
        <Route path="/" component={MainContainer}>
          <IndexRoute components={{pageContent: ListViewContainer}}/>
          <Route path="/my_lists" components={{pageContent: MyListsPage}}/>
          <Route path="/settings" components={{pageContent: SettingsPage}}/>
          <Redirect from='/*' to='/'/>
        </Route>
      </Router>
    </div>
  )
}

export default App;
