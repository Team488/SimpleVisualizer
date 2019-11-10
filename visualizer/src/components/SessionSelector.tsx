import { useStateValue } from "../state/StateContext";
import { getDuration } from "../model/Session";
import React from 'react';

const SessionSelector: React.FC = () => {
    const [ { sessions, currentSession }, dispatch] = useStateValue();

    function handleOnChange(event: React.FormEvent<HTMLSelectElement>) {
        const sessionName = event.currentTarget.value;
        // find session in list
        const session = sessions.find(candidate => candidate.name === sessionName);
        if (session) {
            dispatch({ type: 'session-select', payload: session })
        }
    }

    return (
      <div>
        <select
                value={currentSession && currentSession.name || ''} 
                onChange={handleOnChange}>
            {sessions.map(session => {
                return (
                    <option key={session.name} value={session.name}>{session.name} - {session.startDateTime.toLocaleString()} - {getDuration(session)}s</option>
                );
            })}
        </select>
      </div>
    );
  }

export default SessionSelector;