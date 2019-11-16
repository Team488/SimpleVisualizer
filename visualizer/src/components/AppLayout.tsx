import React from 'react';
import styled from 'styled-components';
import SessionSelector from './SessionSelector';
import TimelineSlider from './TimelineSlider';
import Field from './Field';
import Robot from './Robot';
import RawCurrentData from './RawCurrentData';
import { AppBar, Toolbar } from '@material-ui/core';

const AppLayout: React.FC = () => (
    <div>
        <AppBar position="static">
            <Toolbar>
                <h2 style={{
                    flexGrow: 1
                }}>Visualizer</h2>
                <SessionSelector />
            </Toolbar>
        </AppBar>
        <AppContainer>
            <TimelineSlider />
            <MainContent>
                <Field>
                <Robot />
                </Field>
                <RawCurrentData />
            </MainContent>
        </AppContainer>
    </div>
);

const AppContainer = styled.div`
  margin: 20px;
`;

const MainContent = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export default AppLayout;