import { useStateValue } from "../state/StateContext";
import { getDuration } from "../model/Session";

import Select from '@material-ui/core/Select';
import React from 'react';
import { MenuItem, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      color: 'white',
    }
  });

const SessionSelector: React.FC = () => {
    const [ { sessions, currentSession }, dispatch] = useStateValue();
    const classes = useStyles();

    function handleOnChange(event: React.ChangeEvent<{ value: unknown }>): void {
        const sessionName = event.target.value as string;
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
                classes={{
                    root: classes.root
                }}
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