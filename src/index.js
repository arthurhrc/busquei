import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reducer, { initialState } from './reducer';
import { StateProvider } from './StateContext';
import ErrorBoundary from './components/ErrorBoundary/index';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <StateProvider initialState={initialState} reducer={reducer}>
        <App />
      </StateProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
