import React from 'react';
import styled from 'styled-components';
import { robotWidthPixels, robotLengthPixels } from '../coordinates/robot';
import { useStateValue } from '../state/StateContext';
import { realToScreenPose } from '../coordinates/field';

const Robot: React.FC = () => {
    const [ { posePoints, playbackIndex }, _ ] = useStateValue();
    if (!posePoints) {
        return null;
    }
    const realPose = posePoints[playbackIndex];
    const pose = realToScreenPose(realPose);
    
    const x = pose.x - robotLengthPixels / 2.0; // center inside 0,0
    const y = pose.y - robotWidthPixels / 2.0;

		return (
			<RobotBox style={
                    {
                        width: robotLengthPixels,
                        height: robotWidthPixels,
                        transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + pose.heading + 'deg)',
                    }} >
                <RobotFrontIndicator />
            </RobotBox>
		);
};

const RobotBox = styled.div`
    background-color: green;
    position: absolute;
    top: 0px;
    left: 0px;
`;

const RobotFrontIndicator = styled.div`
    height: 100%;
    width: 10px;
    background-color:  blue;
    float: right;
`;

export default Robot;