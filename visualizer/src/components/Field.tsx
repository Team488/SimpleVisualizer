import React from 'react';
import styled from 'styled-components';
import { fieldScreenXPixels, fieldScreenYPixels, screenToRealPose } from '../coordinates/field';
import fieldImg from '../assets/field.jpg';
import { useSpring, animated } from 'react-spring';

// Outter element that wraps the inner field, room for the human stations and the like
const Field: React.FC = ({children}) => {
    return (
        <StyledFieldOuter>
            <img
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%'    
                }} src={fieldImg} />
            <FieldInner>
                {children}
            </FieldInner>
        </StyledFieldOuter>
    );
}

const StyledFieldOuter = styled.div`
    position: relative;
`;

interface RelativeMousePose {
    relativeX: number,
    relativeY: number
}

// The part of the field the robot can go on
const FieldInner: React.FC = ({children}) => {
    const [state, setState] = React.useState<RelativeMousePose | null>(null);

    function handlePointerMove(e: any) {
        const { x, y } = e.currentTarget.getBoundingClientRect();
        const { pageX, pageY } = e;

        const relativeX = pageX - x;
        const relativeY = pageY - y;
        
        setState({
            relativeX,
            relativeY
        });
    }

    function handlePointerLeave(e: any) {
        setState(null);
    }

    return (
        <StyledFieldInner 
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave} >
            {state && <PoseToolTip relativeX={state.relativeX} relativeY={state.relativeY} /> }
            {children}
        </StyledFieldInner>
    );
}

interface PoseToolTipProps {
    relativeX: number,
    relativeY: number
}

const PoseToolTip: React.FC<PoseToolTipProps> = ({ 
    relativeX,
    relativeY
}) => {
    const toolTipX = relativeX - 65;
    const toolTipY = relativeY - 50;
    const { xy } = useSpring({ xy: [toolTipX, toolTipY]});

    const fieldPose = screenToRealPose({
        x: relativeX,
        y: relativeY,
        heading: 0
    });

    return (
        <animated.div
                style={{
                    position: 'absolute',
                     // @ts-ignore 
                    transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }} 
                >
            <FloatingTooltip>
                {fieldPose.x.toFixed(1)}", {fieldPose.y.toFixed(1)}"
            </FloatingTooltip>
            
        </animated.div>
    );
};

const FloatingTooltip = styled.div`
    background-color: #ffffffdb;
    width: 130px;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid black;
`;

const StyledFieldInner = styled.div`
    margin: 23px;
    position: relative;
    background-color: #6fd42245;
    width: ${fieldScreenXPixels}px;
    height: ${fieldScreenYPixels}px;
    cursor: crosshair;
`;

export default Field;