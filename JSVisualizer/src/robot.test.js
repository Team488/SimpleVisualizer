import Robot from './robot';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { Position } from './Dimensions';

describe("<Robot>", () => {
    it("Renders without crashing", () => {
        const position = new Position();
        const wrapper = shallow(<Robot position={position} />);
    })
});