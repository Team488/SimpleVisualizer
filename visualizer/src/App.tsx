import React from 'react';

import { useStateValue } from './state/StateContext';
import Api from './influx-api/Api';
import AppLayout from './components/AppLayout';

const api = new Api();

const App: React.FC = () => {
  const [ { currentSession }, dispatch ] = useStateValue();

  // initially load sessions
  React.useEffect(() => {
    api.listSessions().then(sessions => {
      dispatch({ type: 'sessions-loaded', payload: sessions });
    })
  }, []);
  
  // fetch points when current session changes
  React.useEffect(() => {
    if(!currentSession) {
      return;
    }

    api.getPointsForSession(currentSession.name)
    .then(points => {
      dispatch({ type: 'points-loaded', payload: points})
    });
  }, [currentSession]);

  return (
    <AppLayout />
  );
}


export default App;
