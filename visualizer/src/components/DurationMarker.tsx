import React from 'react';
import { useStateValue } from '../state/StateContext';

const DurationMarker: React.FC = () => {
    const [ { currentSession, posePoints, playbackIndex } ] = useStateValue();

    if (!posePoints || !currentSession) {
        return null;
    }

    const currentPoint = posePoints[playbackIndex];
    const timeInSeconds = (currentPoint.time.getTime() - currentSession.startDateTime.getTime()) / 1000.0;

    return (
        <span>
            {timeInSeconds.toFixed(2)}s
        </span>
    );
}

export default DurationMarker;