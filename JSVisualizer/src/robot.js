import React, { Component } from 'react';
import './robot.css';

const robotLengthInches = 36;
const robotWidthInches = 24; 

class Robot extends Component {

	render() {
		let rotation = -1 * (this.props.position.heading - 90);

		let robotWidth = robotWidthInches / this.props.pixelsPerInche;
		let robotLength = robotLengthInches / this.props.pixelsPerInche;

		let x = this.props.position.y - robotLength / 2.0; // center inside 0,0
		let y = this.props.position.x - robotWidth / 2.0;

		return (
			<div className="robot" style={
				{
					width: robotLength,
					height: robotWidth,
					transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + rotation + 'deg)',
				}}>
					<div className="robot-front"></div>
				</div>
		);
	}
}

export default Robot;