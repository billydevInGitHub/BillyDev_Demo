import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


// setup fake backend
import { configureFakeBackend } from './_helpers/fake-backend';
configureFakeBackend();

ReactDOM.render(<App />, document.getElementById('root'));