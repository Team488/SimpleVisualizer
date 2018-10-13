import React, { Component } from 'react';
import Robot from './robot';
import fieldImg from './field.jpg';
import './field.css';

class Field extends Component {
	render() {
		return (
			<div>
				<div className="field" style={{
					width: this.props.screenXPixels,
					height: this.props.screenYPixels
				}}>
					<img className="field-img" src={fieldImg}></img>
                    <Robot 
                        position={this.props.robotPosition} 
                        pixelsPerInche={this.props.pixelsPerInche}/>
				</div>
			</div>
		);
	}
}

export default Field;