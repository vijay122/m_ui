import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout, loginUser } from '../../redux/modules/auth';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import areIntlLocalesSupported from 'intl-locales-supported';
import MenuItem from 'material-ui/MenuItem';

import { asyncConnect } from 'redux-async-connect';
import { bindActionCreators } from 'redux';

import * as loginActions from '../../redux/modules/auth';

function mapStateToProps(state) {
  console.log('state '+state);
  return { products: state.products }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, loginActions), dispatch)
}



export  class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }
   constructor(props) {
    super(props);
     this.state = {value1: 1};
   
  }
/*
  handleSubmit = (event) => {
    debugger;
     promise: ({store: {dispatch, getState}}) => {
    if (!isAuthLoaded(getState())) {
      return dispatch(loginUser());
    }
  }

    //event.preventDefault();
   // loginUser();
    const input = this.refs.username;
    //return loginActions.loginUser("user","pass");
    //input.value = '';
  }
  */
       handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state.username,this.state.password);
  }
   handleRegister = (event) => {
    event.preventDefault();
    this.props.register("user");
  }
  onChange(e)
  {
      e.preventDefault();
      this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }
  render() {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        {user &&
        <div>
          <p>You are currently logged in as {user.name}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log Out</button>
          </div>
        </div>
        }
 <div>
<Row>
<Col md={6}>
<Row>
<h4>New User</h4>
</Row>
<Row>
  <TextField
      hintText="Enter your 10 digit mobile number"
      floatingLabelText="This is the username"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='username' onChange={this.onChange.bind(this)} value={this.state.username}/>
</Row>
<Row>
  <RaisedButton label="Create Account" primary={true} onClick={this.handleRegister} />
</Row>
</Col>
<Col md={6}>
<Row>
<h4>Registered User</h4>
</Row>
<Row>
  <TextField
      hintText="Enter the username"
      floatingLabelText="This is the username"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='username' onChange={this.onChange.bind(this)} value={this.state.username}/>
</Row>
<Row>
<TextField
      hintText="Enter the password"
      floatingLabelText="This is the password"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='password' onChange={this.onChange.bind(this)} value={this.state.password}/>
</Row>
<Row>
  <RaisedButton label="Login" primary={true} onClick={this.handleSubmit}/>
</Row>
</Col>
</Row>
</div>

      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
