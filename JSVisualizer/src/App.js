import React, { Component } from 'react';
import logo from './logo.svg';
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
	}
    }
    componentDidMount() {
	this.timer = setInterval(() => this.getItems(), 100);
    }
    getItems() {
	fetch('http://localhost:8086/query?db=mydb&q=select value from pos_x ORDER BY DESC LIMIT 1')
	    .then(response => response.json())
	    .then(data => {
		console.log(data);
		this.setState({
		    x: data.results[0].series[0].values[0][1],
		});
	    });	
    }
    render() {
	return (
		<div>
		    Field X:{this.state.x}
		    <div class="field">
                <div class="robot" style={{top: this.state.x}}></div>
            </div>
	    
		</div>
	);
    }
}

export default App;
