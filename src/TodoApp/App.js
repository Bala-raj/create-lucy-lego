import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React, { Component } from "react";
import TabView from "../aw-mfe/components/main/TabView";
import { getTodosFromServer } from "../aw-mfe/store/fakeserver";
import store from "../aw-mfe/store/store";
// import { hot } from "react-hot-loader";
import "./App.css";
import CONSTANTS from '../aw-mfe/constants';

class App extends Component {

  componentDidMount() {
    getTodosFromServer().then((todos) => {
      store.dispatch({ type: 'INIT', payload: todos });
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path={`/${CONSTANTS.MODULE_NAME}`}>
               <TabView />
            </Route>
            <Route path={'/'}>
              <Redirect to={`/${CONSTANTS.MODULE_NAME}`} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

// export default hot(module)(App);
export default App;
