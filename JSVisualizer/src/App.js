import React, { Component } from 'react';
import {Position} from './RobotData';
import {screenXPixels, screenYPixels, pixelsPerInche, normalizeFieldPosition, normalizedToScreenPosition} from './Dimensions';
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
		fetch('http://localhost:8086/query?db=RobotPose&q=select X,Y,Heading from Pose ORDER BY DESC LIMIT 1')
			.then(response => response.json())
			.then(data => {
				// console.log(data);
				try {
					let newPosition = new Position(
						data.results[0].series[0].values[0][1],
						data.results[0].series[0].values[0][2],
						data.results[0].series[0].values[0][3],
					);
					this.setState({
						position: newPosition
					});
				} catch (exception) {
					console.error("Failed to parse data from influx.")
				}
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
