import React, { Component } from 'react';
import Slider from 'react-rangeslider';
// To include the default styles
import 'react-rangeslider/lib/index.css'

class PlayPauseButton extends Component {
	render() {
		let label = "Pause";
		if(!this.props.playing) {
			label = "Play";
		}
		return (<button onClick={this.props.onclick}>{label}</button>)
	}
}

const maxValue = 1000;

class SeekBar extends Component {
    handleOnChange = (value) => {
        let percent = value / maxValue;

        this.props.onPercentChanged(percent);
    }
    render() {
        const percent = this.props.percent;
        
        const value = maxValue * percent;

        return (
            <Slider min={0} max={maxValue} value={value} onChange={this.handleOnChange}></Slider>
        );
    }
}

export {PlayPauseButton, SeekBar};