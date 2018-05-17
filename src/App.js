import React, { Component } from 'react';
import {POSScreen} from './POSScreen';


export class App extends Component {
  render() {
    return (
        <POSScreen />
    );
  }
}







/*import React from 'react';

import VirtualizedSelect from 'react-virtualized-select';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
const DATA = require('./Cities');

export class CitiesField extends React.Component{
  constructor(props){
    super(props)
    this.state = {selectValue: "Hi"}
  }

	updateValue (newValue) {
		this.setState({
			selectValue: newValue
		});
	}

	render () {
		var options = DATA.CITIES;
		return (
			<div>
				<h1>Generate Bill</h1>
				<VirtualizedSelect ref="citysSelect"
					options={options}
					simpleValue
					clearable
					name="select-city"
					value={this.state.selectValue}
					onChange={this.updateValue}
					searchable
					labelKey="name"
					valueKey="name"
				/>
			</div>
		);
	}
}
*/
