

import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';



export default class GeoCoder extends React.Component {
   constructor(props) {
    super(props);
   this.state = {value1: 1};
  }
  post= function(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('POST', url);
var data = new FormData();
data.append('user', 'person');
data.append('pwd', 'password');
data.append('organization', 'place');
data.append('requiredkey', 'key');
    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(JSON.parse(req.response));
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send(data);
  });
}
  GeoCode()
  {
    var address ={};
    address.country = this.state.country;
    address.postalCode = this.state.zipcode;
  	;
  	 this.post('http://localhost:8000/geoCode').then(function(response) {
  console.log("Success!", response);

  });
}
getValidationState()
  {
    if(this.state!=null)
    {
      
    }
  }
onChange(e)
  {
      e.preventDefault();
      this.state[e.target.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }
    render() 
    {
   
      return(
         <form validationState={this.getValidationState}>
        <Row>
        <Col md={12}>
        <Row>
        <h3>Enter the address of the place:</h3>
        <hr />
         <TextField
      hintText="House Number"
            floatingLabelFixed={true}
        floatingLabelText="enter the house number"
         data-ctrlid="housenumber" 
      onChange={this.onChange.bind(this)} 
      value={this.state.housenumber}/>
         <TextField
      hintText="Street"
            floatingLabelFixed={true}
        floatingLabelText="enter the street name"
         data-ctrlid="street" 
      onChange={this.onChange.bind(this)} 
      value={this.state.street}/>
        <TextField
      hintText="City"
            floatingLabelFixed={true}
        floatingLabelText="the city it belongs to"
         data-ctrlid="city" 
      onChange={this.onChange.bind(this)} 
      value={this.state.city}/>
      <TextField
      hintText="Zipcode"
            floatingLabelFixed={true}
        floatingLabelText="the city it belongs to"
         data-ctrlid="zipcode" 
      onChange={this.onChange.bind(this)} 
      value={this.state.zipcode}/>
          <TextField
      hintText="State"
            floatingLabelFixed={true}
        floatingLabelText="what is the state"
         data-ctrlid="stateName" 
      onChange={this.onChange.bind(this)} 
      value={this.state.stateName}/>
          <TextField
      hintText="Country"
            floatingLabelFixed={true}
        floatingLabelText="country name"
         data-ctrlid="country" 
      onChange={this.onChange.bind(this)} 
      value={this.state.country}/>

          <FlatButton label="Apply" primary={true} onClick={this.GeoCode.bind(this)}/>
        <hr />
</Row>

</Col>
</Row>
</form>
  );
}
}
