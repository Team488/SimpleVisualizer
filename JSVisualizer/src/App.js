import React, { Component } from 'react';
import {Position, screenXPixels, screenYPixels, pixelsPerInche, normalizeFieldPosition, normalizedToScreenPosition} from './Dimensions';
import {fetchLatestPosition, fetchLatestPositions, SessionData} from './RobotData';
import Field from './field';
import './App.css';
import { PlayBackState } from './PlayBack';


class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sessionData: null,
			playbackState: null,
			isConnected: false,
		}
	}
	componentDidMount() {
		this.timer = setInterval(() => this.step(), 100);
		fetchLatestPositions().then(positions => {
			const sessionData = new SessionData(positions);
			const playbackState = new PlayBackState(sessionData);
			playbackState.playing = true;
			this.setState({
				sessionData: sessionData,
				playbackState: playbackState,
				isConnected: true
			});
		});
	}
	step() {
		if(!this.state.isConnected) {
			return;
		}
		this.state.playbackState.tick();
		this.setState({
			playbackState: this.state.playbackState
		});
	}
	handlePlayPause() {
		this.state.playbackState.togglePlaying();
		this.setState({
			playbackState: this.state.playbackState
		});
	}
	render() {
		if(!this.state.isConnected) {
			return <div>Not connected to InfluxDB</div>
		}



		let normalizedPosition = normalizeFieldPosition(this.state.playbackState.currentPoint());
		let screenPosition = normalizedToScreenPosition(normalizedPosition);
		return (
			<div className="App">
				<div>
					<PlayPauseButton playing={this.state.playbackState.playing} onclick={() => this.handlePlayPause()}></PlayPauseButton>
				</div>
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

class PlayPauseButton extends Component {
	render() {
		let label = "Pause";
		if(!this.props.playing) {
			label = "Play";
		}
		return (<button onClick={this.props.onclick}>{label}</button>)
	}
}

export default App;
export { PlayPauseButton };
