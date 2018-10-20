import React, { Component } from 'react';
import Field from './field'
import './App.css';


const fieldXInches = 320;
const fieldYInches = 650;

const pixelsPerInche = fieldYInches / 800; // defines screen size of field

const screenXPixels = fieldYInches / pixelsPerInche;
const screenYPixels = fieldXInches / pixelsPerInche;


function normalizeFieldPosition(position) {
	return new Position(
		position.x / fieldXInches,
		position.y / fieldYInches,
		position.heading
	)
}

function normalizedToScreenPosition(position) {
	return new Position(
		position.x * screenYPixels,
		position.y * screenXPixels,
		position.heading
	)
}

function Position(x, y, heading) {
	this.x = x;
	this.y = y;
	this.heading = heading;
}

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
				console.log(data);
				this.setState({
					position: new Position(
						data.results[0].series[0].values[0][1],
						data.results[0].series[0].values[0][2],
						data.results[0].series[0].values[0][3],
					)
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
