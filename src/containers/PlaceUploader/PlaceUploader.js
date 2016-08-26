import React, { Component } from 'react';
import { Link } from 'react-router';
import { FileUploader, TabsSection, GeoCoder } from 'components';
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
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

import Input from 'react-bootstrap/lib/Input';
import Panel from 'react-bootstrap/lib/Panel';
import ButtonInput from 'react-bootstrap/lib/ButtonInput';

import DropDownMenu from 'material-ui/DropDownMenu';


import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
};
const items = [
  <MenuItem key={1} value="standalone" primaryText="Place" />,
  <MenuItem key={2} value="hotel" primaryText="Hotel" />,
  <MenuItem key={3} value="event" primaryText="Event" />
];

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props.route} was activated.`);
}





export class AdditionalInfoComponent extends Component
{
constructor(props)
{
  super(props);
}
addNew()
{

}
  render()
  {
return(<div>
 <input type="button" onClick={this.addNew} value="Additional Field" />
  <label>AdditionalInfo:</label>
<textbox />
<label>Value</label>
<textbox />
  </div>)
  }
}

const InitialState =
{
  image:"",
  name:"",
  title:"",
  latitude:"",
  longitude:"",
city:"",
pincode:"",
desc:"",
   landmark:"",
   type:"",
  state:"",
  country:"",
}



export default class PlaceUploader extends Component {

   constructor(props) {
    super(props);
     this.state = {value1: 1};
     this._create = this._create.bind(this);
    this.submitform = this.submitform.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.validateForm = this.validateForm.bind(this);
    
      this.state = {type: null};
  }
 handleChange(e,index,value)
 {
  debugger;
  this.setState({type:value});
 } 

   _create() {
    this.state.image =this.refs['UploadImages'].state.images;
     var postdata = this.state;
       fetch('http://localhost:8000/Save', {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
postdata
  })
}).then(function()
{
  this.setState({InitialState});
});
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
      this.ajax('http://localhost:8000/api/photo',image).then(function(result)
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
      this.state[e.target.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }
  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
}
handleSelect = (event, index, value) => 
{
  debugger;
  this.setState({type:value})
  this.state.type = value;
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
    if(!this.isValid(this.state.state))
  {
    errorlist.push("please enter valid state.");
  }
   if(!this.isValid(this.state.country))
  {
    errorlist.push("please enter valid country.");
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
    debugger;
 
    // this.uploadImage();
     //.then(function(resp)
    //  {
    //    console.log(resp);
       // this._create();
   //   });

this._create();
  };
  
  render() {
    const styles = require('./PlaceUploader.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">

          <Grid>
             <form validationState={this.getValidationState}>
              
  <Row>
  {this.state.status != undefined && this.state.status.length>0 && this.state.status.map(function(status)
    {
     <Panel header={status.text} bsStyle="primary">
      {status.message}
    </Panel>
    })
  }
  </Row>
    <Tabs>
    <Tab label="Item One" >
      <div>
        <Row className="show-grid">
      <Col xs={12} md={6}>
        <TextField
      hintText="Name in Characters"
      floatingLabelText="Enter the place name"
      floatingLabelFixed={true}
      data-ctrlid="name" 
      onChange={this.onChange.bind(this)} 
      value={this.state.name}/>


        <TextField
      hintText="Title for the place"
      floatingLabelText="Suggest a title"
      floatingLabelFixed={true}
      data-ctrlid="name" 
      onChange={this.onChange.bind(this)} 
     data-ctrlid='title' onChange={this.onChange.bind(this)} value={this.state.title}/>

  
<TextField
      hintText="Get me the latitude"
      floatingLabelText="Geo coordinates latitude"
      floatingLabelFixed={true}
      data-ctrlid="name" 
      onChange={this.onChange.bind(this)} 
     data-ctrlid='latitude' onChange={this.onChange.bind(this)} value={this.state.latitude}/>

 <TextField
      hintText="Get me the longitude"
      floatingLabelText="Geo coordinates longitude"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
     data-ctrlid='longitude' onChange={this.onChange.bind(this)} value={this.state.longitude}/>

<TextField
      hintText="City that the place belongs to"
      floatingLabelText="Get me the city name"
      floatingLabelFixed={true}
      data-ctrlid="city" 
      onChange={this.onChange.bind(this)} 
       data-ctrlid='city' onChange={this.onChange.bind(this)} value={this.state.city}/>
       <TextField
      hintText="State that the place belongs to"
      floatingLabelText="Get me the state name"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
       data-ctrlid='state' onChange={this.onChange.bind(this)} value={this.state.state}/>
 <TextField
      hintText="Pin code details"
      floatingLabelText="Pincode"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
       data-ctrlid='pincode' onChange={this.onChange.bind(this)} value={this.state.pincode}/>
<TextField
      hintText="Country that the place belongs to"
      floatingLabelText="Get me the country name"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
       data-ctrlid='class' onChange={this.onChange.bind(this)} value={this.state.country}/>


     <FileUploader ref='UploadImages' />
      </Col>
       <Col xs={12} md={6}>

 <TextField
      floatingLabelText="Describe the place in 20 words"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
       multiLine={true}
      rows={3}
     data-ctrlid='description' onChange={this.onChange.bind(this)} value={this.state.description}/>
 
 <TextField
 hintText="tell us abt the nearby landmarks...."
      floatingLabelText="Landmark details"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
       multiLine={true}
      rows={3}
     data-ctrlid='landmark' onChange={this.onChange.bind(this)} value={this.state.landmark} />

 <SelectField value={this.state.type} data-ctrlid='type' onChange={this.handleSelect.bind(this)}>
          <MenuItem value="standalone" data-ctrlid='type' primaryText="Place" />
          <MenuItem value="hotel" data-ctrlid='type' primaryText="Hotel" />
          <MenuItem value="event" data-ctrlid='type' primaryText="Event" />
        </SelectField>
       <RaisedButton label="Submit Button" onClick={this.submitform} primary={true}/>
        <Row>
    <Col>
    </Col>
    <Col>
    </Col>
    </Row>
     </Col>
    </Row>
      </div>
    </Tab>
    <Tab label="Item Two" >
      <div>
        <h2 style={styles.headline}>Tab Two</h2>
        <p>
          This is another example tab.
        </p>
      </div>
    </Tab>
    <Tab label="onActive">
      <div>
        <h2 style={styles.headline}>Tab Three</h2>
        <p>
          This is a third example tab.
        </p>
      </div>
    </Tab>
  </Tabs>
            
   
     </form>
         </Grid>
        </div>
      </div>
    );
  }
}