import React from 'react';
import './pos.css'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {Button,Container, Row, Col} from 'reactstrap';
import Background from './images/pos.jpg';
import {Table} from 'reactstrap';
import Cancel from 'react-icons/lib/io/android-cancel';
import ArrowUp from 'react-icons/lib/io/android-arrow-up';
import ArrowDown from 'react-icons/lib/io/arrow-down-c';


const DATA = require('./Products');

let selectedItemsList = [];
let grandTotal = 0;
const sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${Background})`
};
const style= {
  color: 'white'
};
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
    if (selectedItemsList[index].quantity !== 0){
      selectedItemsList[index].quantity -= 1;
      selectedItemsList[index].total = selectedItemsList[index].value * selectedItemsList[index].quantity;
      grandTotal -= selectedItemsList[index].value;
    }
    this.setState({initiateStateChangeForRenderToLoadAgain: grandTotal});
    console.log(selectedItemsList);
  }

  addToCart = () => {
    
    let checkMultipleProductsCounter = 0;
    selectedItemsList.map(product => {
      if(this.state.selectedOption.label === product.label){
         checkMultipleProductsCounter += 1;
      }
      return 'x';
    });
    
    if(this.state.selectedOption.label == null){
      alert("Select a product.");
    }
    else if (checkMultipleProductsCounter > 0) {
      alert("Product is already present in your shopping cart.");
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
    const { selectedOption } = this.state;
    
    let items = null;
    if(selectedItemsList.length > 0){
    items = (
        <div>
          <Table borderless responsive>
            <thead>
              <tr>
                <th style={style}>#</th>
                <th style={style}>Product</th>
                <th style={style}>Rate</th>
                <th style={style}>Quantity</th>
                <th style={style}>Total</th>
              </tr>
            </thead>
            <tbody>
              { selectedItemsList.map((product, index) => {
                return (
                  <tr>
                    <th scope='row' style={style}>{index+1}</th>
                    <td style={style}>{product.label}</td>
                    <td style={style}>{product.value}</td>
                    <td style={style}>{product.quantity}</td>
                    <td style={style}>{product.total}</td>
                    <td style={style} onClick={() => this.incrementItem(index)}><ArrowUp /></td>
                    <td style={style} onClick={() => this.decrementItem(index)}><ArrowDown /></td>
                    <td style={style} onClick= {() => this.handleDeleteItem(index)}><Cancel /></td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        </div>
      );
    }
    let GT = null;
    let checkout = null;
    if(grandTotal > 0){
      GT=  <p style={style}>Grand Total: {grandTotal}</p>;
      checkout =  <Button color="success" size="md" onClick={this.checkout} >Checkout</Button>;
    }

   
		return (
      <div className = "abcd" style = {sectionStyle} >
      <div className = "abc">
          <Container>
            <Row>
              <Col lg={{ size: 6, order: 2, offset: 1 }}>
                <Select
                name="Select the product"
                value={selectedOption}
                onChange={this.handleChange}
                options={options}
                />
              </Col>
              <Col lg={{ size: 2, order: 2, offset: 0 }}>
                <Button color="success" size="md" onClick={this.addToCart}>Add to cart</Button>
              </Col>
            </Row>
            <Row>
              <Col sm={{ size: 'lg', order: 2, offset: 2 }}>
                {items}
              </Col>
            </Row>
            <Row>
              <Col sm={{ size: '2', offset: 4}}>
                {GT}
              </Col>   
              <Col sm={{ size: '2'}}>
                {checkout}          
              </Col>
            </Row>
          </Container>
        </div>
      </div>
		);
	}
}



