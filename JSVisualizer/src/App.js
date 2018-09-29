import React, { Component } from 'react';
import fieldImg from './field.jpg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
	    <Field />
      </div>
    );
  }
}

class Field extends Component {
    constructor(props) {
	super(props);
	this.state = {
		x: 0,
		r: 0,
		y: 0,
	}
    }
    componentDidMount() {
	this.timer = setInterval(() => this.getItems(), 100);
    }
    getItems() {
	fetch('http://localhost:8086/query?db=mydb&q=select r,x,y from pos ORDER BY DESC LIMIT 1')
	    .then(response => response.json())
	    .then(data => {
		console.log(data);
		this.setState({
			r: data.results[0].series[0].values[0][1],
			x: data.results[0].series[0].values[0][2],
			y: data.results[0].series[0].values[0][3],
		});
	    });	
    }
    render() {
	return (
		<div>
		    Field X:{this.state.x}
		    <div className="field">
				<img className="field-img" src={fieldImg}></img>
                <div className="robot" style={
					{
						left: this.state.x, 
						top: 100, 
						transform: 'rotate(' + this.state.x + 'deg)',
					}}></div>
            </div>
	    
		</div>
	);
    }
}

export default App;
