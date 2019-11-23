import { useStateValue } from "../state/StateContext";
import React from 'react';

const RawCurrentData: React.FC = () => {
    const [ { posePoints, playbackIndex }, _ ] = useStateValue();
    if (!posePoints) {
        return null;
    }
    const currentPoint = posePoints[playbackIndex];
    return (
        <div>
            <h3>Current Point</h3>
            <table>
                <tbody>
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
                </tbody>
            </table>
        </div>
    );
};

export default RawCurrentData;