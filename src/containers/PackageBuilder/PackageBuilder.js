import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton } from '../../components';
import { FileUploader, TypeAhead } from '../../components';
import config from '../../config';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Carousel from 'react-bootstrap/lib/Carousel';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

//import Input from 'react-bootstrap/lib/Input';
import Panel from 'react-bootstrap/lib/Panel';
//import ButtonInput from 'react-bootstrap/lib/ButtonInput';

import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

export default class PackageBuilder extends Component {

   constructor(props) {
    super(props);
    this.submitform = this.submitform.bind(this);
    this.validateForm = this.validateForm.bind(this);
     this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
      this.addProduct = this.addProduct.bind(this);
      this.addAdditionalInfo = this.addAdditionalInfo.bind(this);

      var emptyInfo={};
      emptyInfo.key="";
      emptyInfo.value="";
      var arr=[];
      arr.push(emptyInfo);
    this.state ={
      products:[],
      type:'package',
      additionalinfo:[],
       finished: false,
    stepIndex: 0,
displayoffer: (!!this.props.complete) || false
    };
   // this.state.type='place';
  }

 get= function(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

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
    req.send();
  });
}


addProduct(product)
  {  
    var prod ={};
    if(this!= undefined && this.refs!= undefined && this.refs.newproduct!= undefined &&
this.refs.newproduct.state!= undefined && 
     this.refs.newproduct.state.searchText != undefined && this.refs.newproduct.state.searchText.valueKey!= undefined)
    {
      prod = this.refs.newproduct.state.searchText.product
    }
     var prdlist =  this.state.products;
     if(prod != {})
      prdlist.push(prod);
    this.setState({'products':prdlist});
      }

   _create() {
     this.state.scrollimage =this.refs['scrollimage'].state.images[0];
     var postdata = this.state;
       fetch(process.env.Svc+'/Save', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
postdata
  })
})
  }
   ajax(url,file) {
  return new Promise(function(resolve, reject) {
  var data = new FormData();
    data.append('SelectedFile', file);
    var request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            try {
                var resp = JSON.parse(request.response);
            } catch (e){
                var resp = {
                    status: 'error',
                    data: 'Unknown error occurred: [' + request.responseText + ']'
                };
            }
            console.log(resp.status + ': ' + resp.data);
        }
    };
     request.open('POST', url);
      request.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(request.response);
      } else {
        reject({
          status: this.status,
          statusText: request.statusText
        });
      }
    };
    request.onerror = function () {
      reject({
        status: this.status,
        statusText: request.statusText
      });
    };
    request.send(data);
});
}
  onUploadProgress()
  {

  }
  uploadImage(file)
  {  
          var that = this;
          var images=[];

      
    for(var i=0; i<this.refs["file"].files.length; i++)
    {
  var image = this.refs["file"].files[i];
    {
      this.ajax(process.env.Svc+'/api/photo',image).then(function(result)
        {
          console.log(result);
       var  responseObj = JSON.parse(result);
         images.push(responseObj.url);
        
      });
     
    }
        }
  }
  onUploadError()
  {

  }
  onUploadFinish()
  {

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
      this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
}
handleUpload()
{

}
isValid(input)
{
if(input== undefined || input=="")
{
  return false;
}
else
{
  return true;
}
}
validateForm()
{
  var errorlist=[];
  if(!this.isValid(this.state.name))
  {
    errorlist.push("please enter valid name.");
  }
   if(!this.isValid(this.state.title))
  {
    errorlist.push("please enter valid title.");
  }
  if(!this.isValid(this.state.latitude))
  {
    errorlist.push("please enter valid latitude.");
  }
  if(!this.isValid(this.state.longitude))
  {
    errorlist.push("please enter valid longitude.");
  }
   if(!this.isValid(this.state.city))
  {
    errorlist.push("please enter valid city.");
  }
    if(!this.isValid(this.state.pincode))
  {
    errorlist.push("please enter valid pincode.");
  }
     if(!this.isValid(this.state.desc))
  {
    errorlist.push("please enter valid description.");
  }
      if(!this.isValid(this.state.landmark))
  {
    errorlist.push("please enter valid landmark.");
  }
   if(!this.isValid(this.state.type))
  {
    errorlist.push("please enter valid placetype.");
  }
  if(errorlist.length<=0)
  {
      this.state.status ="Success";
  }
  else if(errorlist.length>0)
  {
        var arr=[];
    var status ={};
    status.text ="Error";
    status.message = 'err';
arr.push(status);
    this.setState({status:arr});

  }

 
    return errorlist;

}

addAdditionalInfo()
{
  var additionalArray= this.state.additionalinfo;
  var ob={};
  ob.key=this.state.key;
  ob.value=this.state.value;
  additionalArray.push(ob);
  this.setState({'addAdditionalinfo':additionalArray});
}
 handleChange(){
    this.setState({
      displayoffer: !this.state.displayoffer
    });
  }
getClassName()
{
  if(this.text)
  {
    return 'validInput';
  }
  else
  {
    return 'invalidInput';
  }
}
  submitform()
  {
    if(this.validateForm().length==0)
this._create();
  };

   handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const styles = require('./PackageBuilder.scss');
     const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          <Grid>
             <form>
                <Row>
  {this.state.status != undefined && this.state.status.length>0 && this.state.status.map(function(status)
    {
 return(
 <Panel header={status.text} bsStyle="primary">
      {status.message}
    </Panel>
     )
  })
}
  </Row>
   <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Enter Package name & details</StepLabel>
          </Step>
          <Step>
            <StepLabel>Add Places</StepLabel>
          </Step>
          <Step>
            <StepLabel>Includes & Excludes</StepLabel>
          </Step>
        </Stepper>
   {stepIndex==0 &&

(<Row className="show-grid">
      <Col xs={12} md={6}>

<TextField
      hintText="Enter the name of the place"
      floatingLabelText="Enter the package name"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='name' onChange={this.onChange.bind(this)} value={this.state.name}/>

<TextField
      hintText="Suitable title for the place"
      floatingLabelText="Suggest a package title"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='title' onChange={this.onChange.bind(this)} value={this.state.title}/>

<TextField
      hintText="Geo co-ordinates of the place"
      floatingLabelText="Get me the latitude"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='latitude' onChange={this.onChange.bind(this)} value={this.state.latitude}/>


<TextField
      hintText="Geo co-ordinates of the place"
      floatingLabelText="Get me the longitude"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='longitude' onChange={this.onChange.bind(this)} value={this.state.longitude}/>

 <TextField
      hintText="Nearest city to the place"
      floatingLabelText="Get me the city name"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='city' onChange={this.onChange.bind(this)} value={this.state.city}/>

<TextField
      hintText="Pincode of the place"
      floatingLabelText="Get me the pincode"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='pincode' onChange={this.onChange.bind(this)} value={this.state.pincode}/>

      </Col>
       <Col xs={12} md={6}>
<TextField
      hintText="Why this place is important to visit"
      floatingLabelText="Describe the place in 20 words"
      floatingLabelFixed={true}
        multiLine={true}
      rows={3}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='desc' onChange={this.onChange.bind(this)} value={this.state.description}/>

<TextField
      hintText="Tell us abt the nearby landmarks"
      floatingLabelText="Landmark details"
      floatingLabelFixed={true}
        multiLine={true}
      rows={3}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='landmark' onChange={this.onChange.bind(this)} value={this.state.landmark}/>
      <TextField
      hintText="Best price to complete the package"
      floatingLabelText="Package Price"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='price' onChange={this.onChange.bind(this)} value={this.state.price}/>
      
        <TextField
      hintText="Offers"
      floatingLabelText="Promotional Offers"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='offer' onChange={this.onChange.bind(this)} value={this.state.offer}/>

         <TextField
      hintText="Category"
      floatingLabelText="category type"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='category' onChange={this.onChange.bind(this)} value={this.state.category}/>
  
        <TextField
      hintText="Tour Package Operator"
      floatingLabelText="Created By"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='operator' onChange={this.onChange.bind(this)} value={this.state.operator}/>
<Checkbox
      label="Publish on home screen?"
      labelPosition="left"
      style={styles.checkbox}
      ref="complete"
       onChange={this.handleChange} />
  
        <FileUploader ref='scrollimage' />
   <RaisedButton label="Submit" onClick={this.submitform} primary={true}/>
     </Col>
    </Row>)}
{stepIndex==1 &&

(
    <div>
    <TypeAhead  ref="newproduct" floatinglabel="Place to add with package"/>
             <Row className="show-grid">
      </Row>
       <RaisedButton label="Add Product" onClick={this.addProduct} primary={true}/>
    <Row>
  <div>
{this.state && this.state.products.length>0 && this.state.products.map(function(product){
 return( <img src={product.image} style={{height: 100 + 'px',width:100+'px'}}></img>);
})
}
</div>
</Row>
    </div>)}

  {stepIndex==2 &&
    (<div>
 {this.state && this.state.additionalinfo.length>0 && this.state.additionalinfo.map(function(info){
 return( 
  <div>
  <Row>
  Additional info Available:
  </Row>
  <Row>
 <Col xs={12} md={6}>
 <input type="text"value={info.key}></input>
 </Col>
<Col xs={12} md={6}>
 <input type="text" value={info.value}></input>
</Col>
</Row>
</div>
  )
})
}
  <Row> 
  <TextField
      hintText="(food/snacks etc)"
      floatingLabelText="Add Additional Info"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='key' onChange={this.onChange.bind(this)} value={this.state.key}/>

       <TextField
      hintText="Why this Additional info is important"
      floatingLabelText="Add Additional Value"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='value' onChange={this.onChange.bind(this)} value={this.state.value}/>
</Row>
<Row>
 <RaisedButton label="Additional Field" onClick={this.addAdditionalInfo} primary={true}/>
</Row>
</div>)}
 
  <div>
              <p>{this.getStepContent(stepIndex)}</p>
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onTouchTap={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onTouchTap={this.handleNext}
                />
              </div>
            </div>
     </form>
         </Grid>
        </div>
      </div>
    );
  }
}