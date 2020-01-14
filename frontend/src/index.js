import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import registerServiceWorker from './registerServiceWorker';

import { Router } from 'react-router-dom';
import history from "./services/history";

ReactDOM.render(
    <Router history={history}>
      <App />
    </Router>,
    document.getElementById('root')
);
registerServiceWorker();
