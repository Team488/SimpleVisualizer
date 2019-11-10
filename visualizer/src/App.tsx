import React from 'react';
// import logo from './assets/logo.svg';
// import './App.css';
import { StateProvider, useStateValue } from './state/StateContext';
import Api from './influx-api/Api';
import { getDuration } from './model/Session';
import SessionSelector from './components/SessionSelector';

const api = new Api();

const App: React.FC = () => {
  const [ _, dispatch ] = useStateValue();

  // initially load sessions
  React.useEffect(() => {
    api.listSessions().then(sessions => {
      dispatch({ type: 'sessions-loaded', payload: sessions });
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Header
      </header>
      <SessionSelector />
    </div>
  );
}

export default App;
