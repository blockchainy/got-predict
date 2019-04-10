import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { routes } from "./constants";
import Home from './containers/Home';
import Stats from './containers/PersonalStats'

import './index.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path={routes.HOME} component={Home} />
          <Route exact path={routes.STATS} component={Stats} />
        </Switch>
      </Router>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
