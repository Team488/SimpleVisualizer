import React from 'react';
// import logo from './assets/logo.svg';
// import './App.css';
import { StateProvider, useStateValue } from './state/StateContext';
import Api from './influx-api/Api';
import { getDuration } from './model/Session';
import SessionSelector from './components/SessionSelector';
import RawPosePoints from './components/RawPosePoints';
import TimelineSlider from './components/TimelineSlider';

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
    <div>
      <header>
        Visualizer
      </header>
      <SessionSelector />
      <TimelineSlider />
      <RawPosePoints />
    </div>
  );
}

export default App;
