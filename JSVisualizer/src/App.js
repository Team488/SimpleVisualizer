import React, { Component } from 'react';
import {Position, screenXPixels, screenYPixels, pixelsPerInche, normalizeFieldPosition, normalizedToScreenPosition} from './Dimensions';
import {fetchLatestPosition, fetchLatestPositions} from './RobotData';
import Field from './field';
import './App.css';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			position: new Position(0, 0, 0),
		}
	}
	componentDidMount() {
		this.timer = setInterval(() => this.step(), 100);
		fetchLatestPositions().then(positions => {
			this.setState({
				positions: positions,
				positionIndex: 0
			});
		});
	}
	step() {
		if(!this.state.positions) {
			return;
		}
		let newIndex = (this.state.positionIndex + 1) % this.state.positions.length;
		this.setState({
			positionIndex: newIndex,
			position: this.state.positions[newIndex]
		})
	}
	render() {
		let normalizedPosition = normalizeFieldPosition(this.state.position);
		let screenPosition = normalizedToScreenPosition(normalizedPosition);
		return (
			<div className="App">
				X is {screenPosition.x}
				<Field 
					robotPosition={screenPosition} 
					screenXPixels={screenXPixels} 
					screenYPixels={screenYPixels} 
					pixelsPerInche={pixelsPerInche}
					/>
			</div>
		);
	}
}

export default App;
