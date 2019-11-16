import { useStateValue } from "../state/StateContext";
import React from 'react';

const RawCurrentData: React.FC = () => {
    const [ { posePoints, playbackIndex }, _ ] = useStateValue();
    if (!posePoints) {
        return null;
    }
    const currentPoint = posePoints[playbackIndex];
    const currentPoints = posePoints.slice(playbackIndex, playbackIndex + 100);
    return (
        <div>
            <h3>Current Point</h3>
            <table>
                <tr>
                    <td>X</td>
                    <td>{currentPoint.x.toFixed(3)}</td>
                </tr>
                <tr>
                    <td>Y</td>
                    <td>{currentPoint.y.toFixed(3)}</td>
                </tr>
                <tr>
                    <td>Heading</td>
                    <td>{currentPoint.heading.toFixed(3)}</td>
                </tr>
            </table>
        </div>
    );
};

export default RawCurrentData;