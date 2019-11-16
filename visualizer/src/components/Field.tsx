import React from 'react';
import styled from 'styled-components';
import { fieldScreenXPixels, fieldScreenYPixels } from '../coordinates/field';

// Outter element that wraps the inner field, room for the human stations and the like
const Field: React.FC = ({children}) => {
    return (
        <StyledFieldOuter>
            <FieldInner>
                {children}
            </FieldInner>
        </StyledFieldOuter>
    );
}

const StyledFieldOuter = styled.div`
    padding: 20px;
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
    position: relative;
    background-color: grey;
    width: ${fieldScreenXPixels}px;
    height: ${fieldScreenYPixels}px;
`;

export default Field;