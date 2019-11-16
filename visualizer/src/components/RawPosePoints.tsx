import { useStateValue } from "../state/StateContext";
import React from 'react';

const RawPosePoints: React.FC = () => {
    const [ { posePoints, playbackIndex }, _ ] = useStateValue();
    if (!posePoints) {
        return null;
    }
    const currentPoint = posePoints[playbackIndex];
    const currentPoints = posePoints.slice(playbackIndex, playbackIndex + 100);
    return (
        <div>
            <h3>{posePoints.length} points</h3>
            <div>Current point: Heading: {currentPoint.heading.toFixed(3)}</div>
            <ul>
                {currentPoints.map(point => (
                    <li key={point.time.getTime()}>
                        Heading: {point.heading.toFixed(3)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RawPosePoints;