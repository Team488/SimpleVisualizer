import { useStateValue } from "../state/StateContext";
import { getDuration } from "../model/Session";

import Select, { SelectProps } from '@material-ui/core/Select';
import React from 'react';
import { MenuItem } from "@material-ui/core";

const SessionSelector: React.FC = () => {
    const [ { sessions, currentSession }, dispatch] = useStateValue();

    function handleOnChange(props: SelectProps) {
        const sessionName = props.value;
        // find session in list
        const session = sessions.find(candidate => candidate.name === sessionName);
        if (session) {
            dispatch({ type: 'session-select', payload: session })
        }
    }

    return (
      <div>
        <Select
                value={currentSession && currentSession.name || ''} 
                onChange={handleOnChange}>
            {sessions.map(session => {
                return (
                    <MenuItem key={session.name} value={session.name}>{session.name} - {session.startDateTime.toLocaleString()} - {getDuration(session)}s</MenuItem>
                );
            })}
        </Select>
      </div>
    );
  }

export default SessionSelector;