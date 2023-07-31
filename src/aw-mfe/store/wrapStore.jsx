import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const wrapStore = (Comp) => {
    return (props) => (<Provider store={store}>
      <Comp {...props}/>
    </Provider>);
}

export default wrapStore;