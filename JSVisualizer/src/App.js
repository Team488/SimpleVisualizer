import React, { Component } from 'react';
import {Position, screenXPixels, screenYPixels, pixelsPerInche, normalizeFieldPosition, normalizedToScreenPosition} from './Dimensions';
import {fetchLatestPosition} from './RobotData';
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
		this.timer = setInterval(() => this.getItems(), 100);
	}
	getItems() {
		fetchLatestPosition().then(newPosition => {
			this.setState({
				position: newPosition
			});
		});
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
