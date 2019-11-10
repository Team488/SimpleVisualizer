import React from 'react';
// import logo from './assets/logo.svg';
// import './App.css';
import { StateProvider, useStateValue } from './stores/StateContext';

const App: React.FC = () => {
  const [ { sessions }, dispatch] = useStateValue();

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
      <button onClick={() => {
        dispatch({type: 'createSession', payload: { name: 'new session'}})
      }}>Add session</button>
      <ul>
        {sessions.map(session => {
          return (
            <li key={session.name}>{session.name}</li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
