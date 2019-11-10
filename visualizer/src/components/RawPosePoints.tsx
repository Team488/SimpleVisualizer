import { useStateValue } from "../state/StateContext";
import React from 'react';

const RawPosePoints: React.FC = () => {
    const [ { posePoints }, _ ] = useStateValue();
    if (!posePoints) {
        return null;
    }
    return (
        <ul>
            {posePoints.map(point => (
                <li key={point.time.getTime()}>
                    Heading: {point.heading}
                </li>
            ))}
        </ul>
    );
};

export default RawPosePoints;