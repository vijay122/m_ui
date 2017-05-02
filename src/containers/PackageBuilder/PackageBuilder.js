import React, {Component} from 'react';
import {FileUploader, TypeAhead,MultipleSelectBox} from '../../components';
import config from '../../config';
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import Panel from 'react-bootstrap/lib/Panel';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import * as loginActions from '../../redux/modules/auth';
import * as productActions from '../../redux/modules/products';
import {bindActionCreators} from 'redux';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';

function mapStateToProps(state) {
  console.log('state ' + state);
  return {
    products: (state.products != undefined && state.products.searchresults != undefined && state.products.searchresults.searchOn != undefined) ?
      state.products.searchresults[state.products.searchresults.searchOn][0] : {}, auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, loginActions, productActions), dispatch)
}

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400
  },
};

const InitialState =
  {
    image: "",
    name: "",
    title: "",
    latitude: "",
    longitude: "",
    city: "",
    pincode: "",
    description: "",
    landmark: "",
    type: "",
    state: "",
    country: "",
  }


export class PackageBuilder extends Component {

  constructor(props) {
    super(props);


   // this.state = {
   //   value1: 1,
   //   finished: false,
   //   stepIndex: 0
   // };
 
    this._create = this._create.bind(this);
    this.submitform = this.submitform.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearchSelect = this.handleSearchSelect.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.searchByID = this.searchByID.bind(this);
  }

  handleChange(e, index, value) {
    this.setState({type: value});
  }

    prepareCategory(categorystring)
  {
    var categorylist =[];
    if(categorystring && categorystring.indexOf(',')!= -1)
    {
      categorylist = categorystring.split(',');
      categorylist.clean();
      return categorylist;
    }
  }

    addProduct(product) {
    var prod = {};
    if (this != undefined && this.refs != undefined && this.refs.newproduct != undefined &&
      this.refs.newproduct.state != undefined &&
      this.refs.newproduct.state.searchText != undefined && this.refs.newproduct.state.searchText.value != undefined) {
      prod = this.refs.newproduct.state.searchText.value;
    }
    var prdlist = this.state.products?this.state.products:[];
    if (prod != {})
      prdlist.push(prod);
    this.state.products=prdlist;
    this.setState({'products': prdlist});
  }

  _create() {
         this.state.category = this.prepareCategory(this.state.category);
    var that = this;
   // if (this.state.image == undefined || this.state.image.length == 0) {
   //   this.state.image = this.refs['UploadImages'].state.images;
   // }

    var payload = this.state;
    fetch(config.svc + '/Save', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload
      })
    }).then((resp) => {
    });
    this.setState(InitialState);
  }

  ajax(url, file) {
    return new Promise(function (resolve, reject) {
      var data = new FormData();
      data.append('SelectedFile', file);
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (request.readyState == 4) {
          try {
            var resp = JSON.parse(request.response);
          } catch (e) {
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

  searchByID() {
    var id = "";
    var searchon = "standalone";
    if (this.state.searchtype != undefined) {
      searchon = this.state.searchtype;
    }
    if (this != undefined && this.refs != undefined && this.refs.searched_id != undefined &&
      this.refs.searched_id.state != undefined &&
      this.refs.searched_id.state.searchText != undefined && this.refs.searched_id.state.searchText.resultKey != undefined) {
      id = this.refs.searched_id.state.searchText.resultKey;
    }

    var searchcriteria = {};
    searchcriteria.searchby = "_id";
    searchcriteria.findtable = searchon;
    searchcriteria.searchvalue = id;
    this.props.search("search", searchcriteria);

  }

  onUploadProgress() {

  }

  uploadImage(file) {
    var that = this;
    var images = [];


    for (var i = 0; i < this.refs["file"].files.length; i++) {
      var image = this.refs["file"].files[i];
      {
        this.ajax(process.env.Svc + '/api/photo', image).then(function (result) {
          console.log(result);
          var responseObj = JSON.parse(result);
          images.push(responseObj.url);

        });

      }
    }
  }

  onUploadError() {

  }

  onUploadFinish() {

  }

  getValidationState() {
    if (this.state != null) {

    }
  }

  onChange(e) {
    // e.preventDefault();
    var statename = e.target.attributes["data-ctrlid"].value;
    var newvalue = e.currentTarget.value;
    this.setState({statename: newvalue});
    this.state[e.target.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  handleSelect = (event, index, value) => {
    this.setState({type: event.currentTarget.value})
    this.state.type = event.currentTarget.value;
  }
  handleSearchSelect = (event) => {
    var st = event.target.value;
    this.setState({searchtype: st})
    //this.state.searchtype = st;
  }

  handleUpload() {

  }

  isValid(input) {
    if (input == undefined || input == "") {
      return false;
    }
    else {
      return true;
    }
  }

  validateForm() {
    var isvalid = false;
    var status = {};
    var errorlist = [];
    if (!this.isValid(this.state.name)) {
      errorlist.push("please enter valid name.");
    }
    if (!this.isValid(this.state.title)) {
      errorlist.push("please enter valid title.");
    }
    if (!this.isValid(this.state.city)) {
      errorlist.push("please enter valid city.");
    }
    if (!this.isValid(this.state.pincode) && !this.state.pincode.length == 6) {
      errorlist.push("please enter valid pincode.");
    }
    if (!this.isValid(this.state.description)) {
      errorlist.push("please enter valid description.");
    }
    if (!this.isValid(this.state.landmark)) {
      errorlist.push("please enter valid landmark.");
    }
    if (!this.isValid(this.state.type)) {
      errorlist.push("please enter valid placetype.");
    }
    if (!this.isValid(this.state.state)) {
      errorlist.push("please enter valid state.");
    }
    if (!this.isValid(this.state.country)) {
      errorlist.push("please enter valid country.");
    }
    if (!this.isValid(this.state.assets.display)) {
      if ((this.state.image == undefined || this.state.image.length == 0) && (this.refs['UploadImages'] != undefined && this.refs['UploadImages'].state != undefined && this.refs['UploadImages'].state.images != undefined && this.refs['UploadImages'].state.images.length != 0)) {
        this.state.image = this.refs['UploadImages'].state.images;
      }
      else {
        errorlist.push("please add a photo.");
      }
    }
    if (errorlist.length <= 0) {
      status.text = "Success";
      status.message = [];
      status.message[0] = "Place details has been successfully saved. It will be validated once in our backend and will be available soon for purchase."
    }
    else if (errorlist.length > 0) {

      status.text = "Error";
      status.message = errorlist;


    }
    if (errorlist.length == 0) {
      isvalid = true;
    }
    this.setState({status: status});

    return isvalid;

  }

  addAdditionalInfo() {

  }

  getClassName() {
    if (this.text) {
      return 'validInput';
    }
    else {
      return 'invalidInput';
    }
  }

  submitform(e) {
     e.preventDefault();
    var r = confirm("Please verify all the details were provided correctly like images, names and geo coordinates. If everything is correct, click 'ok' to proceed to save, else click cancel to edit.");
    if (r == true) {
      if (this.validateForm()) {
        this._create();
      }
    }
    else {
    }
  }

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
    var that = this;
    var stat = {};
     var searchtype = "Package";
     var defaultPlaceType;
     this.state = this.props.products;
    if (searchtype == undefined) {
      this.state.searchtype = searchtype;
    }
    if (this.state.type != undefined && this.state.type != "") {
      defaultPlaceType = this.state.type;
    }
    var img = this.props.products.image;
    if (this.props.products != undefined) {
      var prods = this.props.products;
      if(prods.length!=undefined)
      {
       
//this.state = Object.keys(prods).forEach(function(key,index) {
//  debugger;
//   return that.state[key] = prods[key];
    // key: the name of the object key
    // index: the ordinal position of the key within the object 
//});
}

      if (this.props.products.loc != undefined) {
        this.state.image = img;

       // this.state.latitude = this.props.products.loc.coordinates[1];
       // this.state.longitude = this.props.products.loc.coordinates[0];

      }
      this.state.status = stat;
      this.state.searchtype = searchtype;
    }
    if (this.props.auth != undefined && this.props.auth.user != undefined && this.props.auth.user._id) {
      this.state.created_by = this.props.auth.user._id
    }
   // this.onChange = this.onChange.bind(this);
    let {finished, stepIndex} = this.state;
   //stepIndex = 0;
    const styles = require('./PackageBuilder.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <div className="">
          <Grid>
            <form validationState={this.getValidationState}>
                 <Row>
                <label>Search</label>
                <select value={this.state.searchtype} data-ctrlid='searchtype' defaultValue={defaultPlaceType}
                        onChange={this.handleSearchSelect} required>
                  <option value="None" data-ctrlid='searchtype'>None</option>
                  <option value="Package" data-ctrlid='searchtype'>Package</option>
                </select>
                <TypeAhead ref="searched_id" searchTable="Package" searchby="name" resultKey="_id"/>
                <RaisedButton label="Find" onClick={this.searchByID}  primary={true}/>
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
              <Row>
                {this.state.status != undefined && this.state.status.message != undefined &&
                <Panel header={this.state != undefined && this.state.status != undefined && this.state.status.text}
                       bsStyle="primary">
                  {this.state.status != undefined && this.state.status.message != undefined && this.state.status.message.length > 0 && this.state.status.message.map(function (status) {
                    return <li><span>{status}</span></li>
                  })
                  }
                </Panel>
                }
              </Row>
                  <div>
                  <Row className="show-grid">
                      <Col xs={12} md={6}>
                        <TextField
                          hintText="Name in Characters"
                          floatingLabelText="Enter the place name"
                          floatingLabelFixed={true}
                          data-ctrlid="name"
                          default
                          onChange={this.onChange.bind(this)}
                          value={this.state.name}/>


                        <TextField
                          hintText="Title for the place"
                          floatingLabelText="Suggest a title"
                          floatingLabelFixed={true}
                          data-ctrlid='title' onChange={this.onChange.bind(this)} value={this.state.title}/>

                          <label>No of Days:</label>
                  <select value={this.state.noofdays} data-ctrlid='noofdays' defaultValue={""}
                          onChange={this.handleDaysSelect} required>
                    <option value="1" data-ctrlid='noofdays'>1</option>
                    <option value="2" data-ctrlid='noofdays'>2</option>
                     <option value="3" data-ctrlid='noofdays'>3</option>
                    <option value="4" data-ctrlid='noofdays'>4</option>
                    <option value="5" data-ctrlid='noofdays'>5</option>
                    <option value="6" data-ctrlid='noofdays'>6</option>
                      <option value="7" data-ctrlid='noofdays'>7</option>
                    <option value="8" data-ctrlid='noofdays'>8</option>
                     <option value="9" data-ctrlid='noofdays'>9</option>
                    <option value="10" data-ctrlid='noofdays'>10</option>
                    <option value="11" data-ctrlid='noofdays'>11</option>
                    <option value="12" data-ctrlid='noofdays'>12</option>
                  </select>

                   <label>No of Nights:</label>
                  <select value={this.state.noofnights} data-ctrlid='noofnights' defaultValue={""}
                          onChange={this.handleNightsSelect} required>
                     <option value="1" data-ctrlid='noofnights'>1</option>
                    <option value="2" data-ctrlid='noofnights'>2</option>
                     <option value="3" data-ctrlid='noofnights'>3</option>
                    <option value="4" data-ctrlid='noofnights'>4</option>
                    <option value="5" data-ctrlid='noofnights'>5</option>
                    <option value="6" data-ctrlid='noofnights'>6</option>
                           <option value="7" data-ctrlid='noofnights'>7</option>
                    <option value="8" data-ctrlid='noofnights'>8</option>
                     <option value="9" data-ctrlid='noofnights'>9</option>
                    <option value="10" data-ctrlid='noofnights'>10</option>
                    <option value="11" data-ctrlid='noofnights'>11</option>
                    <option value="12" data-ctrlid='noofnights'>12</option>
                  </select>


                        <TextField
                          hintText="Get me the latitude"
                          floatingLabelText="Geo coordinates latitude"
                          floatingLabelFixed={true}
                          errorText=""
                          data-ctrlid='latitude' onChange={this.onChange.bind(this)} value={this.state.latitude}/>

                        <TextField
                          hintText="Get me the longitude"
                          floatingLabelText="Geo coordinates longitude"
                          floatingLabelFixed={true}
                          type="Number"
                          data-ctrlid='longitude' onChange={this.onChange.bind(this)} value={this.state.longitude}/>

                        <TextField
                          hintText="City that the place belongs to"
                          floatingLabelText="Get me the city name"
                          floatingLabelFixed={true}
                          data-ctrlid='city' onChange={this.onChange.bind(this)} value={this.state.city}/>

                          <TextField
                    hintText="district of the place"
                    floatingLabelText="Get me the district name"
                    floatingLabelFixed={true}
                    data-ctrlid='district' onChange={this.onChange.bind(this)} value={this.state.district}/>
 
                        <TextField
                          hintText="State that the place belongs to"
                          floatingLabelText="Get me the state name"
                          floatingLabelFixed={true}
                          data-ctrlid='state' onChange={this.onChange.bind(this)} value={this.state.state}/>
                        <TextField
                          hintText="Pin code details"
                          floatingLabelText="Pincode"
                          floatingLabelFixed={true}
                          maxLength="6"
                          type="number"
                          data-ctrlid='pincode' onChange={this.onChange.bind(this)} value={this.state.pincode}/>
                        <TextField
                          hintText="Country that the place belongs to"
                          floatingLabelText="Get me the country name"
                          floatingLabelFixed={true}
                          data-ctrlid='country' onChange={this.onChange.bind(this)} value={this.state.country}/>
                      </Col>
                      <Col xs={12} md={6}>

                        <TextField
                          floatingLabelText="Describe the place in 20 words"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='description' onChange={this.onChange.bind(this)} value={this.state.description}/>

                        <TextField
                          hintText="tell us abt the nearby landmarks...."
                          floatingLabelText="Landmark details"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='landmark' onChange={this.onChange.bind(this)} value={this.state.landmark}/>
                       
                        <TextField
                    hintText="Best price to complete the package"
                    floatingLabelText="Package Price"
                    floatingLabelFixed={true}
                    data-ctrlid='price' onChange={this.onChange.bind(this)} value={this.state.price}/>

                  <TextField
                    hintText="Offers"
                    floatingLabelText="Promotional Offers"
                    floatingLabelFixed={true}
                    data-ctrlid='offer' onChange={this.onChange.bind(this)} value={this.state.offer}/>

                  <TextField
                    hintText="Category"
                    floatingLabelText="category type"
                    floatingLabelFixed={true}
                    data-ctrlid='category' onChange={this.onChange.bind(this)} value={this.state.category}/>

                        <TextField
                    hintText="Tour Package Operator"
                    floatingLabelText="Created By"
                    floatingLabelFixed={true}
                    data-ctrlid='created_by' onChange={this.onChange.bind(this)} value={this.state.created_by}/>

                    <TextField
                          hintText="tell us abt speciality of this travel operator"
                          floatingLabelText="About the travel operator"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='aboutoperator' onChange={this.onChange.bind(this)} value={this.state.aboutoperator}/>
                     <label>Package Type</label>
                  <select value={this.state.searchtype} data-ctrlid='classification' defaultValue={""}
                          onChange={this.handleClassificationSelect} required>
                    <option value="none" data-ctrlid='classification'>None</option>
                    <option value="grouppackage" data-ctrlid='classification'>GroupPackage</option>
                  </select>
                    <FileUploader ref='scrollimage'/>
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
                   <div>
                   <div>
                  <TypeAhead ref="newproduct" searchTable="Place" searchby="name" resultKey="_id" nofilter="true" floatinglabel="Place to add with package"/>
                  <Row className="show-grid">
                  </Row>
                  <RaisedButton label="Add Product" onClick={this.addProduct} primary={true}/>
                  <Row>
                    <div>
                      {this.state && this.state.products && this.state.products.length > 0 && this.state.products.map(function (product) {
                        return ( <img src={product.image[0]} style={{height: 100 + 'px', width: 100 + 'px'}}></img>);
                      })
                      }
                    </div>
                  </Row>
                </div>
                </div>
            </form>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PackageBuilder);

