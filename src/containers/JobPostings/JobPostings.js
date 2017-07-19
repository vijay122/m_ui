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
    const styles = require('./JobPostings.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <div className="">
          <Grid>
             <h1>Work With Us</h1>
             <Row>
             <h2>Want to make the web a better place for more than a billion people each month? We’re hiring.</h2>
             </Row>
            <form validationState={this.getValidationState}>

                  <div>
                    <Row className="show-grid">
                    <div>
                      <h1>HOW WE WORK</h1><br/>

<h2>Choose your own adventure</h2><br/>
 Everyone works from the location they choose. We’re located at the heart of Chennai city. 
 We’re dedicated to creating technology that makes travel better for everyone. Whether you’re an avid techie, an experienced business professional, a recent graduate or a student, we have a job for you.
 When you make it past the interview stage we’ll do a project together on contract, typically lasting between two to six weeks depending on how much time you can spend, to see how we work together. When you join full-time, you’ll do customer support for WordPress.com for your first three weeks and spend a week in support annually, for evermore, regardless of your position. We believe an early and ongoing connection with the people who use our products is irreplaceable.
<h2>Meeting up</h2><br/>
 We get the whole company together once a year for seven days so that Automatticians can create bonds that influence them all year long. So far we’ve done Grand Meetups in San Francisco, California; La Paz, Mexico; Oracle, Arizona; Breckenridge, Colorado; Mont-Sainte-Anne, Québec; Seaside, Florida; Budapest, Hungary; San Diego, California; Santa Cruz, California; Park City, Utah; and Whistler, Canada.

 In addition to our all-company Grand Meetup, teams meet for five to seven days to brainstorm team-level strategy and bond in locales ranging from Boulder to Buenos Aires, Las Vegas to Lisbon, Montréal to Mexico City, and Vienna to Vietnam. If you join our merry band, expect to travel three to four weeks per year.
<h2>Diversity and Inclusion</h2><br/>
 In 2014 we started to work, as a company, on facilitating spaces for discussions about diversity at Automattic. And at the 2016 Grand Meetup with all of our employees across 50 countries, we decided to share with the rest of the world what we are doing about diversity and inclusion.
<h2>What do we look for?</h2><br/>
 Automatticians are curious, driven, compassionate, tenacious, autonomous, friendly, independent, collaborative, communicative, supportive, self-motivated, and amazing with .gifs. We want to work with people interested in making the web and the world a better place. Think you’ve got what it takes? Apply today.
<h2>Getting to know us</h2><br/>
 Would you like to know a bit more about what it’s like to be part of Automattic? Check out this Business Insider interview with Matt on how our company runs without offices or email. Meet a few colleagues (aka Automatticians) and hear about their experiences in their own words. Eric did a Q&A on what it’s like to work at Automattic. Still on the fence? Karen says you should really just apply. Take a look at all of the things we accomplished in 2016.
                   <h2>Current Openings</h2>
                   Travel Consultant
Experience: Min 2 yrs
Qualification: Any Graduate
Job Type: Permanent, full time
Apply
Job Description
Driving sales of International/Domestic holiday packages.
Designing itineraries, vacation packages, costing and hotel booking.
Fostering existing relationships and developing new ones.
Build business relationships.
Keep accurate and detailed records of sales made and results achieved.
Understand and manage personal performance on a daily basis.
Service and generating leads & follow-Up with the customer.
Requirement
Enthusiastic with excellent Communication Skills.
Confident and ability to interact with customers.
Knowledge of the Travel industry.
Should be highly sales oriented.
Should be excellent with international destination knowledge.
Good knowledge of destinations, suppliers & hotels.
                    </div>  
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