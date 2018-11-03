import Field from './field';
import React, { Component } from 'react';
import { shallow } from 'enzyme';
import { Position } from './Dimensions';

describe("<Field>", () => {
    it("Renders without crashing", () => {
        const position = new Position();
        const wrapper = shallow(<Field
            robotPosition={new Position()} 
            screenXPixels={50} 
            screenYPixels={50} 
            pixelsPerInche={5}
        />);
    })
});