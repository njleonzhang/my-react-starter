import React from 'react';
import ReactDOM from 'react-dom';
import '@styles/index.css';
import App from '@pages/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('app'));

registerServiceWorker();
