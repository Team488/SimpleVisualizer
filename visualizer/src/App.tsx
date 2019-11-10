import React from 'react';
// import logo from './assets/logo.svg';
// import './App.css';
import { StateProvider, useStateValue } from './stores/StateContext';
import Api from './influx-api/Api';
import { getDuration } from './model/Session';

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
      <SessionList />
    </div>
  );
}

const SessionList: React.FC = () => {
  const [ { sessions }, dispatch] = useStateValue();
  return (
    <div>
      Session List
      <ul>
        {sessions.map(session => {
          return (
            <li key={session.name}>{session.name} - {session.startDateTime.toLocaleString()} - {getDuration(session)}s</li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
