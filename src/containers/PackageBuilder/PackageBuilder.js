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
    products: (state.products != undefined && state.products.searchresults != undefined ) ?
      state.products.searchresults.packages[0] : {}, auth: state.auth
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, loginActions, productActions), dispatch)
}

export class PackageBuilder extends Component {

  constructor(props) {
    super(props);
    this.submitform = this.submitform.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.addAdditionalInfo = this.addAdditionalInfo.bind(this);
    this.searchByID = this.searchByID.bind(this);
    this.handleSearchSelect = this.handleSearchSelect.bind(this);
    this.handleClassificationSelect = this.handleClassificationSelect.bind(this);

    var emptyInfo = {};
    emptyInfo.key = "";
    emptyInfo.value = "";
    var arr = [];
    arr.push(emptyInfo);
    this.state = {
      products: [],
      assets: {display: "", image: []},
      type: 'package',
      additionalinfo: [],
      finished: false,
      stepIndex: 0,
      displayoffer: (!!this.props.complete) || false
    };
    // this.state.type='place';
  }

  get = function (url) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function () {
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
      req.onerror = function () {
        reject(Error("Network Error"));
      };

      // Make the request
      req.send();
    });
  }

  isEmpty(obj) {
    return Object.keys(obj).length === 0;
  }

  searchByID() {
    var id = "";
    if (this != undefined && this.refs != undefined && this.refs.searched_id != undefined &&
      this.refs.searched_id.state != undefined &&
      this.refs.searched_id.state.searchText != undefined && this.refs.searched_id.state.searchText.resultKey != undefined) {
      id = this.refs.searched_id.state.searchText.resultKey;
    }

    var searchcriteria = {};
    searchcriteria.searchby = "_id";
    searchcriteria.findtable = this.state.searchtype;
    searchcriteria.searchvalue = id;
    this.props.search("search", searchcriteria);

  }

  handleDaysSelect = (event) => {
    var st = event.target.value;
    this.state.noofdays = st;
  }

  handleNightsSelect = (event) => {
    var st = event.target.value;
    this.state.noofnights = st;
  }

  addProduct(product) {
    var prod = {};
    if (this != undefined && this.refs != undefined && this.refs.newproduct != undefined &&
      this.refs.newproduct.state != undefined &&
      this.refs.newproduct.state.searchText != undefined && this.refs.newproduct.state.searchText.resultKey != undefined) {
      prod = this.refs.newproduct.state.searchText.value
    }
    var prdlist = this.state.products;
    if (prod != {})
      prdlist.push(prod);
    this.setState({'products': prdlist});
  }

  _create() {
    try {

      if (this.state.assets == undefined || ( this.state.assets!= undefined && this.state.assets.display!= undefined && this.state.assets.display=="" )) {
        this.state.assets = {};
        this.state.assets.display = this.refs['scrollimage'].state.images[0];
      }

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
      })
    }
    catch (e) {
      console.log(e);
    }
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

  onUploadProgress() {

  }

  uploadImage(file) {
    var that = this;
    var images = [];


    for (var i = 0; i < this.refs["file"].files.length; i++) {
      var image = this.refs["file"].files[i];
      {
        this.ajax(config.svc + '/api/photo', image).then(function (result) {
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
    e.preventDefault();
    this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({value: nextProps.value});
  }

  handleUpload() {

  }

  handleSearchSelect = (event) => {
    var st = event.target.value;
    this.state.searchtype = st;
  }

  handleClassificationSelect = (event) => {
    var st = event.target.value;
    this.state.classification = st;
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
    var errorlist = [];
    if (!this.isValid(this.state.name)) {
      errorlist.push("please enter valid name.");
    }
    if (!this.isValid(this.state.title)) {
      errorlist.push("please enter valid title.");
    }
    if (!this.isValid(this.state.latitude)) {
      errorlist.push("please enter valid latitude.");
    }
    if (!this.isValid(this.state.longitude)) {
      errorlist.push("please enter valid longitude.");
    }
    if (!this.isValid(this.state.city)) {
      errorlist.push("please enter valid city.");
    }
    if (!this.isValid(this.state.pincode)) {
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
            if (!this.isValid(this.state.aboutoperator)) {
      errorlist.push("please enter valid info about travel operator.");
    }
    if (errorlist.length <= 0) {
      this.state.status = "Success";
    }
    else if (errorlist.length > 0) {
      var arr = [];
      var status = {};
      status.text = "Error";
      status.message = 'err';
      arr.push(status);
      this.setState({status: arr});

    }


    return errorlist;

  }

  addAdditionalInfo() {
    var additionalArray = this.state.additionalinfo;
    var ob = {};
    ob.key = this.state.key;
    ob.value = this.state.value;
    additionalArray.push(ob);
    this.setState({'addAdditionalinfo': additionalArray});
  }

  handleChange() {
    this.setState({
      displayoffer: !this.state.displayoffer
    });
  }

  getClassName() {
    if (this.text) {
      return 'validInput';
    }
    else {
      return 'invalidInput';
    }
  }

  submitform() {
    if (this.validateForm().length == 0)
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
    var step = this.state.stepIndex;
    var defaultPlaceType = "Package";
    if (this.state.type != undefined && this.state.type != "") {
      defaultPlaceType = this.state.type;
    }

    var img = this.props.products.assets;
    if (this.props.products != undefined && !this.isEmpty(this.props.products)) {
      this.state = this.props.products;
      if (this.props.products.loc != undefined) {
        this.state.assets = img;
        this.state.stepIndex = step;
        this.state.type = 'package';
        this.state.latitude = this.props.products.loc.coordinates[1];
        this.state.longitude = this.props.products.loc.coordinates[0];
      }
    }

    if (this.props.auth != undefined && this.props.auth.user != undefined && this.props.auth.user.phone_number) {
      this.state.created_by = this.props.auth.user._id
    }

    this.onChange = this.onChange.bind(this);

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
                {this.state.status != undefined && this.state.status.length > 0 && this.state.status.map(function (status) {
                  return (
                    <Panel header={status.text}>
                      {status.message}
                    </Panel>
                  )
                })
                }
              </Row>
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
              {stepIndex == 0 &&

              (<Row className="show-grid">
                <Col xs={12} md={6}>

                  <TextField
                    hintText="Enter the name of the place"
                    floatingLabelText="Enter the package name"
                    floatingLabelFixed={true}
                    data-ctrlid='name' onChange={this.onChange.bind(this)} value={this.state.name}/>

                  <TextField
                    hintText="Enter the duration of the package"
                    floatingLabelText="Enter the package duration"
                    floatingLabelFixed={true}
                    data-ctrlid='duration' onChange={this.onChange.bind(this)} value={this.state.duration}/>

                     <label>No of Days:</label>
                  <select value={this.state.noofdays} data-ctrlid='noofdays' defaultValue={""}
                          onChange={this.handleDaysSelect} required>
                    <option value="1" data-ctrlid='noofdays'>1</option>
                    <option value="2" data-ctrlid='noofdays'>2</option>
                     <option value="3" data-ctrlid='noofdays'>3</option>
                    <option value="4" data-ctrlid='noofdays'>4</option>
                    <option value="5" data-ctrlid='noofdays'>5</option>
                    <option value="6" data-ctrlid='noofdays'>6</option>
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
                  </select>

                  <TextField
                    hintText="Suitable title for the place"
                    floatingLabelText="Suggest a package title"
                    floatingLabelFixed={true}
                    data-ctrlid='title' onChange={this.onChange.bind(this)} value={this.state.title}/>

                  <TextField
                    hintText="Geo co-ordinates of the place"
                    floatingLabelText="Get me the latitude"
                    floatingLabelFixed={true}
                    data-ctrlid='latitude' onChange={this.onChange.bind(this)} value={this.state.latitude}/>


                  <TextField
                    hintText="Geo co-ordinates of the place"
                    floatingLabelText="Get me the longitude"
                    floatingLabelFixed={true}
                    data-ctrlid='longitude' onChange={this.onChange.bind(this)} value={this.state.longitude}/>

                  <TextField
                    hintText="Nearest city/town to the place"
                    floatingLabelText="Get me the city/town name"
                    floatingLabelFixed={true}
                    data-ctrlid='city' onChange={this.onChange.bind(this)} value={this.state.city}/>
                  <TextField
                    hintText="district of the place"
                    floatingLabelText="Get me the district name"
                    floatingLabelFixed={true}
                    data-ctrlid='district' onChange={this.onChange.bind(this)} value={this.state.district}/>

                  <TextField
                    hintText="Nearest city to the state"
                    floatingLabelText="Get me the city state"
                    floatingLabelFixed={true}
                    data-ctrlid='state' onChange={this.onChange.bind(this)} value={this.state.state}/>

                  <TextField
                    hintText="Pincode of the place"
                    floatingLabelText="Get me the pincode"
                    floatingLabelFixed={true}
                    data-ctrlid='pincode' onChange={this.onChange.bind(this)} value={this.state.pincode}/>

                </Col>
                <Col xs={12} md={6}>
                  <TextField
                    hintText="Why this place is important to visit"
                    floatingLabelText="Describe the place in 20 words"
                    floatingLabelFixed={true}
                    multiLine={true}
                    rows={3}
                    data-ctrlid='description' onChange={this.onChange.bind(this)} value={this.state.description}/>

                  <TextField
                    hintText="Tell us abt the nearby landmarks"
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

                    <MultipleSelectBox />

                  <TextField
                    hintText="Tour Package Operator"
                    floatingLabelText="Created By"
                    floatingLabelFixed={true}
                    data-ctrlid='operator' onChange={this.onChange.bind(this)} value={this.state.operator}/>

                    <TextField
                          hintText="tell us abt speciality of this travel operator"
                          floatingLabelText="About the travel operator"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='aboutoperator' onChange={this.onChange.bind(this)} value={this.state.aboutoperator}/>



                  <Checkbox
                    label="Publish on home screen?"
                    labelPosition="left"
                    style={styles.checkbox}
                    ref="complete"
                    onChange={this.handleChange}/>
                  <label>Package Type</label>
                  <select value={this.state.searchtype} data-ctrlid='classification' defaultValue={""}
                          onChange={this.handleClassificationSelect} required>
                    <option value="none" data-ctrlid='classification'>None</option>
                    <option value="grouppackage" data-ctrlid='classification'>GroupPackage</option>
                  </select>

                  <FileUploader ref='scrollimage'/>

                  <RaisedButton label="Submit" onClick={this.submitform} primary={true}/>
                </Col>
              </Row>)}
              {stepIndex == 1 &&

              (
                <div>
                  <TypeAhead ref="newproduct" searchTable="Place" searchby="name" resultKey="_id" nofilter="true" floatinglabel="Place to add with package"/>
                  <Row className="show-grid">
                  </Row>
                  <RaisedButton label="Add Product" onClick={this.addProduct} primary={true}/>
                  <Row>
                    <div>
                      {this.state && this.state.products.length > 0 && this.state.products.map(function (product) {
                        return ( <img src={product.image[0]} style={{height: 100 + 'px', width: 100 + 'px'}}></img>);
                      })
                      }
                    </div>
                  </Row>
                </div>)}

              {stepIndex == 2 &&
              (<div>
                {this.state && this.state.additionalinfo.length > 0 && this.state.additionalinfo.map(function (info) {
                  return (
                    <div>
                      <Row>
                        Additional info Available:
                      </Row>
                      <Row>
                        <Col xs={12} md={6}>
                          <input type="text" value={info.key}></input>
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
                    data-ctrlid='key' onChange={this.onChange.bind(this)} value={this.state.key}/>

                  <TextField
                    hintText="Why this Additional info is important"
                    floatingLabelText="Add Additional Value"
                    floatingLabelFixed={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(PackageBuilder);