import React from 'react';
import './pos.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
//import {QuantitySelect} from './QuantitySelect';
import {Button} from 'reactstrap';

import {Table} from 'reactstrap';
import Cancel from 'react-icons/lib/io/android-cancel';
import ArrowUp from 'react-icons/lib/io/android-arrow-up';
import ArrowDown from 'react-icons/lib/io/arrow-down-c';

const DATA = require('./Products');

let selectedItemsList = [];
let grandTotal = 0;

export class POSScreen extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedOption: '' ,
      initiateStateChangeForRenderToLoadAgain: 0
    };
    this.incrementItem = this.incrementItem.bind(this);
    this.decrementItem = this.decrementItem.bind(this);
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }

  incrementItem = (index) => {
    selectedItemsList[index].quantity += 1;
    selectedItemsList[index].total = selectedItemsList[index].value * selectedItemsList[index].quantity;
    grandTotal += selectedItemsList[index].value;
    this.setState({initiateStateChangeForRenderToLoadAgain: grandTotal});
    console.log(selectedItemsList);
  }

  decrementItem = (index) => {
    selectedItemsList[index].quantity -= 1;
    selectedItemsList[index].total = selectedItemsList[index].value * selectedItemsList[index].quantity;
    grandTotal -= selectedItemsList[index].value;
    this.setState({initiateStateChangeForRenderToLoadAgain: grandTotal});
    console.log(selectedItemsList);
  }

  addToCart = () => {
    if(this.state.selectedOption.label == null){
      console.log("Error. You are not using the pos screen correctly");
    }
    else{
      let tempArray = [
        { label: this.state.selectedOption.label,
          value: this.state.selectedOption.value,
          quantity: 0,
          total: 0},
        ];
      selectedItemsList = selectedItemsList.concat(tempArray);
      this.setState(
        {selectedOption : ''}
      );
    }
  }

  handleDeleteItem = (index) => {
    const itemTotal = selectedItemsList[index].value * selectedItemsList[index].quantity ;
    grandTotal = grandTotal - itemTotal ;
    selectedItemsList.splice(index,1);
    this.setState({initiateStateChangeForRenderToLoadAgain: grandTotal});
  }

  checkout = () => {
    //yet to be defined
  }


  render () {
		const  options = DATA.PRODUCTS;
    const style = {
    display: 'inline-block',
    width: '50%',
    marginLeft: '20%'
    };
    const { selectedOption } = this.state;

    let items = (
        <div style={style}>
          <Table dark>
            <thead>
              <tr>
                <th>#</th>
                <th>Product</th>
                <th>Rate</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              { selectedItemsList.map((product, index) => {
                return (
                  <tr>
                    <th scope='row'>{index+1}</th>
                    <td>{product.label}</td>
                    <td>{product.value}</td>
                    <td>{product.quantity}</td>
                    <td>{product.total}</td>
                    <td onClick={() => this.incrementItem(index)}><ArrowUp /></td>
                    <td onClick={() => this.decrementItem(index)}><ArrowDown /></td>
                    <td onClick= {() => this.handleDeleteItem(index)}><Cancel /></td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
      );

    const style11 = {
      marginLeft: '40%'
    };
    const style12 = {
      marginLeft: '40%',
      padding: '10px'
    };
		return (
			<div >
        <Select
        className = 'center'
        name="Select the product"
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
        />
        <div className="center3">
          <Button color="success" size="lg" onClick={this.addToCart}>Add to cart</Button>
        </div>

        {items}
        <p style={style12}>Grand Total: {grandTotal}</p>
          <Button color="success" size="lg" onClick={this.checkout} style={style11}>Checkout</Button>
      </div>
		);
	}
}
