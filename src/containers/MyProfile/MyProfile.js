import React, { Component } from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import TextField from 'material-ui/TextField';
import {Tabs, Tab} from 'material-ui/Tabs';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../../redux/modules/auth';
import { TablePanel } from '../../components';

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



export class MyProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value1: 1,
      name : this.props.auth.user.name,
    password: this.props.auth.user.password,
    email:this.props.auth.user.email,
      phonenumber:this.props.auth.user.phone_number};
    this._create = this._create.bind(this);
    this.submitform = this.submitform.bind(this);
   // this.handleSelect = this.handleSelect.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  _create() {
    var that = this;
    //this.state.image =this.refs['UploadImages'].state.images;
    var payload = this.state;
    fetch(config.svc+'/updateuser',{
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        payload
      })
    }).then((resp) => {
      alert("then");
    });
    //this.setState(InitialState);
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
    var statename = e.target.attributes["data-ctrlid"].value;
    var newvalue = e.currentTarget.value;
    this.setState({statename : newvalue});
    this.state[e.target.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }
  componentWillReceiveProps(nextProps) {
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
    return true;
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
    if(this.validateForm())
    {
      this._create();
    }

  }

  render() {
    this.onChange = this.onChange.bind(this);
    const styles = require('./MyProfile.scss');
    // require the logo image both from client and server
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="">

          <Grid>
            <form validationState={this.getValidationState}>
              <Tabs>
                <Tab label="Item One" >
                  <div>
                    <Row className="show-grid">
                      <Col xs={12} md={6}>
                        <TextField
                          hintText="Name in Characters"
                          floatingLabelText="Enter your name"
                          floatingLabelFixed={true}
                          data-ctrlid="name"
                          default
                          onChange={this.onChange.bind(this)}
                          value={this.state.name}/>


                        <TextField
                          hintText="Enter your email id"
                          floatingLabelText="Email id"
                          floatingLabelFixed={true}
                          data-ctrlid='email' onChange={this.onChange.bind(this)} value={this.state.email}/>


                        <TextField
                          hintText="Enter a password"
                          floatingLabelText="Password"
                          floatingLabelFixed={true}
                          errorText=""
                          data-ctrlid='password' onChange={this.onChange.bind(this)} value={this.state.password}/>

                        <TextField
                          hintText="Phone number"
                          floatingLabelText="Phone number"
                          floatingLabelFixed={true}
                          data-ctrlid='phonenumber' onChange={this.onChange.bind(this)} value={this.state.phonenumber}/>

                        <TextField
                          hintText="City that the place belongs to"
                          floatingLabelText="Get me the city name"
                          floatingLabelFixed={true}
                          data-ctrlid='city' onChange={this.onChange.bind(this)} value={this.state.city}/>

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
              <Row>
<TablePanel />
              </Row>
              <RaisedButton label="Submit Button" onClick={this.submitform} primary={true}/>

            </form>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('state '+state);
  return { auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, loginActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);