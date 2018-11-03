import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';
import * as RobotData from './RobotData';

describe("<App>", () => {
  const mock_fetch = jest.fn(() => Promise.resolve([]));
  RobotData.fetchLatestPositions = mock_fetch;

  it('Shallow renders without crashing', () => {
    const wrapper = shallow(<App />);
  });

  it('Displays unconnected message', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.text()).toEqual(expect.stringContaining("Not connected to InfluxDB"));
  });
});

