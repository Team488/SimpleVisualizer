import React, { Component } from 'react';
import fieldImg from './field.jpg';
import './App.css';


const fieldXInches = 650;
const fieldYInches = 320;

const pixelsPerInche = fieldXInches / 800; // defines screen size of field

const screenXPixels = fieldXInches / pixelsPerInche;
const screenYPixels = fieldYInches / pixelsPerInche;

const robotLengthInches = 36;
const robotWidthInches = 24; 

// Where is 0,0 on the field in pixels relative to the outer element
const fieldStartOffsetX = 0;
const fieldStartOffsetY = 0;

function normalizeFieldPosition(position) {
	return new Position(
		position.x / fieldXInches,
		position.y / fieldYInches,
		position.heading
	)
}

function normalizedToScreenPosition(position) {
	return new Position(
		position.x * screenXPixels,
		position.y * screenYPixels,
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
		fetch('http://localhost:8086/query?db=mydb&q=select x,y,r from pos ORDER BY DESC LIMIT 1')
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
				<Field robotPosition={screenPosition} />
			</div>
		);
	}
}

class Robot extends Component {

	render() {
		let rotation = this.props.position.heading;

		let robotWidth = robotWidthInches / pixelsPerInche;
		let robotLength = robotLengthInches / pixelsPerInche;

		let x = this.props.position.x - robotLength / 2.0; // center inside 0,0
		let y = this.props.position.y - robotWidth / 2.0;

		return (
			<div className="robot" style={
				{
					left: fieldStartOffsetX,
					top: fieldStartOffsetY,
					width: robotLength,
					height: robotWidth,
					transform: 'translate(' + x + 'px, ' + y + 'px) rotate(' + rotation + 'deg)',
				}}></div>
		);
	}
}

class Field extends Component {
	render() {
		return (
			<div>
				<div className="field" style={{
					width: screenXPixels,
					height: screenYPixels
				}}>
					<img className="field-img" src={fieldImg}></img>
					<Robot position={this.props.robotPosition} />
				</div>
			</div>
		);
	}
}

export default App;
