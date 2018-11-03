import React from 'react';
import App, { PlayPauseButton } from './App';
import { PlayBackState } from './PlayBack'
import { Position } from './Dimensions';
import { SessionData } from './RobotData';

import { shallow } from 'enzyme';
import * as RobotData from './RobotData';

describe("<App>", () => {
  const points = [
    new Position(0,0,0),
    new Position(1, 1, 1)
  ];
  const mock_fetch = jest.fn(() => Promise.resolve(points));
  RobotData.fetchLatestPositions = mock_fetch;

  it('Shallow renders without crashing', () => {
    const wrapper = shallow(<App />);
  });

  it('Displays unconnected message', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.text()).toEqual(expect.stringContaining("Not connected to InfluxDB"));
  });

  it('Loads field with data', () => {
    const wrapper = shallow(<App />);
    
    const sessionData = new SessionData(points);
    const pbs = new PlayBackState(sessionData);

    wrapper.setState({
      isConnected: true,
      playbackState: pbs,
      sessionData: sessionData
    });
    expect(wrapper.text()).not.toEqual(expect.stringContaining("Not connected to InfluxDB"));
  });
});

describe("<PlayPauseButton>", () => {
  it('Renders without crashing', () => {
    const wrapper = shallow(<PlayPauseButton/>);

  });
});
