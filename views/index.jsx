import React from 'react'
import ReactDOM from 'react-dom'
import {Route, Router, browserHistory} from 'react-router'

import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './src/reducer';
import {Provider} from 'react-redux';

import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage';
import immutablejs from 'redux-storage-decorator-immutablejs'
import merger from 'redux-storage-merger-immutablejs';

import Landing from './components/landing/Landing.jsx'
import Login from './components/login/Login.jsx'
import AppLayout from './components/layouts/AppLayout.jsx'
import Dashboard  from './components/dashboard/Dashboard.jsx'
import Profile  from './components/profile/Profile.jsx'
import Foodsearch from './components/foodsearch/Foodsearch.jsx'
import Statsboard from './components/statsboard/Statsboard.jsx'
import Explore from './components/explore/Explore.jsx'

require('./styles.css')

const reducer = storage.reducer(rootReducer, merger);
const engine = immutablejs(createEngine('ORBITAL STORE'));

const storageMiddleware = storage.createMiddleware(engine);

//const loggerMiddleware = createLogger()
const store = createStore(reducer, applyMiddleware(thunkMiddleware, storageMiddleware));

const load = storage.createLoader(engine);
load(store);

const routes = (
    <Router history={browserHistory}>
        <Route path="/" component={Landing}/>
        <Route path="/login" component={Login}/>
        <Route component={AppLayout}>
            <Route path="/dashboard" component={Dashboard}/>
            <Route path="/foodsearch" component={Foodsearch}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/statsboard" component={Statsboard}/>
            <Route path="/explore" component={Explore}/>
        </Route>
    </Router>
)

ReactDOM.render(<Provider store={store}>{routes}</Provider>, document.getElementById('app'))
