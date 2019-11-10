import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './stores/StateContext';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<StateProvider><App /></StateProvider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
