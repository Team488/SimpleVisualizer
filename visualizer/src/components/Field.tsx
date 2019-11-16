import React from 'react';
import styled from 'styled-components';
import { fieldScreenXPixels, fieldScreenYPixels } from '../coordinates/field';
import fieldImg from '../assets/field.jpg';

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

// The part of the field the robot can go on
const FieldInner: React.FC = ({children}) => {
    return (
        <StyledFieldInner>
            {children}
        </StyledFieldInner>
    );
}

const StyledFieldInner = styled.div`
    margin: 23px;
    position: relative;
    background-color: #6fd42245;
    width: ${fieldScreenXPixels}px;
    height: ${fieldScreenYPixels}px;
`;

export default Field;