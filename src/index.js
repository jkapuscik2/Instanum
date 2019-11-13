import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {AuthContext} from "./services/auth";
import {Provider} from 'react-redux'
import store from "./store";
import Auth from "./services/auth/Auth"

ReactDOM.render(
    <Provider store={store}>
        <AuthContext.Provider value={new Auth()}>
            <App/>
        </AuthContext.Provider>
    </Provider>, document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
