import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';

import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import areIntlLocalesSupported from 'intl-locales-supported';
import MenuItem from 'material-ui/MenuItem';

@connect(
  state => ({user: state.auth.user}),
  isLoaded)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }
   constructor(props) {
    super(props);
     this.state = {value1: 1};
   
  }

  handleSubmit = (event) => {
    ;
    event.preventDefault();
    const input = this.refs.username;
    this.props.loginUser("user","pass");
    input.value = '';
  }
   handleRegister = (event) => {
    ;
    event.preventDefault();
    this.props.register("user");
  }
  onChange(e)
  {
      e.preventDefault();
      this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }
  render() {
    ;
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        <h1>Login</h1>
        {!user &&
        <div>
          <form className="login-form form-inline" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input type="text" ref="username" placeholder="Enter a username" className="form-control"/>
            </div>
            <button className="btn btn-success" onClick={this.handleSubmit}><i className="fa fa-sign-in"/>{' '}Log In
            </button>
          </form>
          <p>This will "log you in" as this user, storing the username in the session of the API server.</p>
        </div>
        }
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
      data-ctrlid='username' onChange={this.onChange.bind(this)} value={this.state.uname}/>
</Row>
<Row>
<TextField
      hintText="Enter the password"
      floatingLabelText="This is the username"
      floatingLabelFixed={true}
      onChange={this.onChange.bind(this)} 
      data-ctrlid='username' onChange={this.onChange.bind(this)} value={this.state.pwd}/>
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
