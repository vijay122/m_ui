import React, {Component} from 'react';
import {FileUploader, TypeAhead} from '../../components';
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
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


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
    this.fetchPendingValidationProducts = this.fetchPendingValidationProducts.bind(this);
    this.row = this.row.bind(this);


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

  searchByID(placeId) {
    var id = "";
    var searchon = "standalone";
    if (this.state.searchtype != undefined) {
      searchon = this.state.searchtype;
    }
    if(typeof(placeId)== "string" && placeId)
    {
      id = placeId;
    }
    else if(this != undefined && this.refs != undefined && this.refs.searched_id != undefined &&
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
  componentWillMount()
  {
    this.fetchPendingValidationProducts();
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

  submitform(e) {
     e.preventDefault();
    var r = confirm("Please verify all the details were provided correctly like images, names and geo coordinates. If everything is correct, click 'ok' to proceed to save, else click cancel to edit.");
    if (r == true) {
      if (this.validateForm()) {
        this.state.isValidated=true;
        this._create();
      }
    }
    else {
    }
  }

  fetchPendingValidationProducts()
  {
    var self = this;
    fetch(config.svc + '/findPendingValidationProducts', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      })
    }).then(checkStatus)
      .then(parseJSON)
      .then(function (data) {
        var datalist =[];
        for (var i = 0; i < data.length; i++) {
          var input = {};
          input["id"] = data[i]["_id"];
          input["name"] = data[i]["name"];
          input["city"] = data[i]["city"];
          datalist.push(input);
        }
        self.setState({dataSource: datalist});
      })
  }

  row(x,y)
  {
this.searchByID(this.state.dataSource[x[0]].id);
  }

    TableExampleSimple() {
      var that = this;
      return (
        <Table onRowSelection={that.row}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>City</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.state&& this.state.dataSource && this.state.dataSource.map(function(data){
              return( <TableRow>
                <TableRowColumn>{data.id}</TableRowColumn>
                <TableRowColumn>{data.name}</TableRowColumn>
                <TableRowColumn>{data.city}</TableRowColumn>
              </TableRow>)
            })}

          </TableBody>
        </Table>
      )
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
      this.state = {...this.state,...this.props.products};
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
    const styles = require('./PlaceUploader.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
         <div className={styles.scriptStyles}>
            Fill your pockets now with livelytrips credit points program. Earn Rs 6/- for every place you upload. We want you to grow with Us. refer leads and get Rs 100 extra.
          </div>
        <div className="">

          <Grid>
            <form validationState={this.getValidationState}>
              <Tabs>
                <Tab label="search">
              <Row>
                <label>Search</label>
                <select value={this.state.searchtype} data-ctrlid='searchtype' default={defaultPlaceType}
                        onChange={this.handleSearchSelect} required>
                  <option value="Place" data-ctrlid='searchtype'>Place</option>
                  <option value="Hotel" data-ctrlid='searchtype'>Hotel</option>
                  <option value="Event" data-ctrlid='searchtype'>Event</option>
                </select>
                <TypeAhead ref="searched_id" searchTable={this.state.searchtype} searchby="name" resultKey="_id"/>
                <RaisedButton label="Find" onClick={this.searchByID} primary={true}/>
              </Row>
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
                </Tab>
                <Tab label="fill pending data">
                  {this.TableExampleSimple()}
                </Tab>
              </Tabs>
              <Tabs>
                <Tab label="Item One">
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


                        <FileUploader ref='UploadImages'/>
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
                          hintText="tell us abt the special foods...."
                          floatingLabelText="Special regional foods"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='whattoeat' onChange={this.onChange.bind(this)} value={this.state.whattoeat}/>

                        <TextField
                          hintText="tell us abt the special events in the place...."
                          floatingLabelText="Events in the place"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='whattodo' onChange={this.onChange.bind(this)} value={this.state.whattodo}/>

                        <TextField
                          hintText="tell us how to reach there from nearest city...."
                          floatingLabelText="How to reach this place"
                          floatingLabelFixed={true}
                          multiLine={true}
                          rows={3}
                          data-ctrlid='howtoreach' onChange={this.onChange.bind(this)} value={this.state.howtoreach}/>

                        <select value={this.state.type} data-ctrlid='type' defaultValue={defaultPlaceType}
                                onChange={this.handleSelect.bind(this)} required>
                          <option value="standalone" data-ctrlid='type'>Place</option>
                          <option value="hotel" data-ctrlid='type'>Hotel</option>
                          <option value="event" data-ctrlid='type'>Event</option>
                        </select>

                        <TextField
                          hintText="Uploader name"
                          floatingLabelText="Place uploaded by:"
                          floatingLabelFixed={true}
                          errorText=""
                          data-ctrlid='created_by' onChange={this.onChange.bind(this)} value={this.state.created_by}/>

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
              </Tabs>


            </form>
          </Grid>
        </div>
      </div>
    );
  }
}

function parseJSON(response) {
  return response.json()
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceUploader);