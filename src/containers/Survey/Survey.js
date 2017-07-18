import React, {Component} from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import {connect} from 'react-redux';
import * as loginActions from '../../redux/modules/auth';
import * as productActions from '../../redux/modules/products';
import {bindActionCreators} from 'redux';


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
const items = [
  <MenuItem key={1} value="standalone" primaryText="Place"/>,
  <MenuItem key={2} value="hotel" primaryText="Hotel"/>,
  <MenuItem key={3} value="event" primaryText="Event"/>
];

function handleActive(tab) {
  alert(`A tab with this route property ${tab.props.route} was activated.`);
}


export class AdditionalInfoComponent extends Component {
  constructor(props) {
    super(props);
  }

  addNew() {

  }

  render() {
    return (<div>
      <input type="button" onClick={this.addNew} value="Additional Field"/>
      <label>AdditionalInfo:</label>
      <textbox />
      <label>Value</label>
      <textbox />
    </div>)
  }
}

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


export class PlaceUploader extends Component {

  constructor(props) {
    super(props);


    this.state = {value1: 1};

    this._create = this._create.bind(this);
    this.submitform = this.submitform.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSearchSelect = this.handleSearchSelect.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchByID = this.searchByID.bind(this);


    this.state = {type: null};
  }

  handleChange(e, index, value) {
    this.setState({type: value});
  }

  _create() {
    var that = this;
    if (this.state.image == undefined || this.state.image.length == 0) {
      this.state.image = this.refs['UploadImages'].state.images;
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

    //if(this.isValid(this.state.latitude))
    //{
    //  var val = parseFloat(this.state.latitude);
//var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
//if( reg.exec(val) ) {
    //do nothing
//}
//else
//    errorlist.push("please enter valid latitude.");
//  }
//  else
//  {
//     errorlist.push("please enter valid latitude.");
//  }
//  if(this.isValid(this.state.longitude))
//  {
//    var val = parseFloat(this.state.longitude);
//    var reg = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
//if( reg.exec(val) ) {
    //do nothing
//}
//else
//    errorlist.push("please enter valid longitude.");
//  }
//  else
//  {
//       errorlist.push("please enter valid longitude.");
//  }
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
    if (!this.isValid(this.state.image)) {
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

  submitform() {
    var r = confirm("Please verify all the details were provided correctly like images, names and geo coordinates. If everything is correct, click 'ok' to proceed to save, else click cancel to edit.");
    if (r == true) {
      if (this.validateForm()) {
        this._create();
      }
    }
    else {
    }
  }

  render() {
    var that = this;
    var stat = this.state.status;
    var defaultPlaceType = "standalone";
    var searchtype = this.state.searchtype;
    if (searchtype == undefined) {
      this.state.searchtype = "standalone";
    }
    if (this.state.type != undefined && this.state.type != "") {
      defaultPlaceType = this.state.type;
    }
    var img = this.props.products.image;
    if (this.props.products != undefined) {
      this.state = this.props.products;
      if (this.props.products.loc != undefined) {
        this.state.image = img;

        this.state.latitude = this.props.products.loc.coordinates[1];
        this.state.longitude = this.props.products.loc.coordinates[0];

      }
      this.state.status = stat;
      this.state.searchtype = searchtype;
    }
    if (this.props.auth != undefined && this.props.auth.user != undefined && this.props.auth.user._id) {
      this.state.created_by = this.props.auth.user._id
    }
    this.onChange = this.onChange.bind(this);
    const styles = require('./Survey.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <div className="">
          <Grid>
             <h1>Contact LivelyTrips</h1>
             <Row>
             <h2>We are just a phone call away, dial or give a missed call to 8110001444, to book your trips over phone, or to check enquiries. Still if you want to visit in person, we are glad to have a cup of tea with you in our office.</h2>
             </Row>
            <form validationState={this.getValidationState}>

                  <div>
                    <Row className="show-grid">
                      <Col xs={12} md={6}>
                       <h1>Address</h1>
                         <p>Livelytrips,</p>
                         <p>Aishwarya flats,</p>
                       <p>Drowpathy amman kovil street,</p>
                       <p>Ullagaram,</p>
                       <p>Chennai.</p>
                       <p>
                       <h1>Phone:8110001444</h1>
                       </p>
                      </Col>
                      <Col xs={12} md={6}>

                        <TextField
                          hintText="Your Name"
                          floatingLabelText="Name"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={1}
                          data-ctrlid='name' onChange={this.onChange.bind(this)} value={this.state.name}/>
                          <br/>
                        <TextField
                          hintText="Your Email ID"
                          floatingLabelText="Email ID"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={1}
                          data-ctrlid='email' onChange={this.onChange.bind(this)} value={this.state.email}/>
                          <br/>
                        <TextField
                          hintText="Type the message you want to ask about"
                          floatingLabelText="Type the message here"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='message' onChange={this.onChange.bind(this)} value={this.state.message}/>
                          <br/>
                         <RaisedButton label="Send" onClick={this.searchByID} primary={true}/>
                                               <Row>
                          <Col>
                          </Col>
                          <Col>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>



            </form>
          </Grid>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceUploader);