import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { TablePanel } from '../../components';
import { bindActionCreators } from 'redux';

import * as loginActions from '../../redux/modules/auth';

function mapStateToProps(state) {
  console.log('state '+state);
  return { products: state.products, auth: state.auth }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, loginActions), dispatch)
}



export  class Admin extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }
   constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
      this.handleDisableUser = this.handleDisableUser.bind(this);
     this.state = {value1: 1,role:"user",status:"active"};
     if(this.props.auth!= undefined && this.props.auth.user!= undefined && this.props.auth.user._id)
     {
           this.state.supervisor_id = this.props.auth.user._id;
     }
  }
       handleSubmit = (event) => {
    event.preventDefault();
    this.props.loginUser(this.state.username,this.state.password);
  }
   handleRegister = (event) => {
    event.preventDefault();
     if(this.state.username != "")
    this.props.register(this.state);
  }
  handleChange(e){
    this.setState({role:e.target.value});
  }
  handleDisableUser()
  {
     var disablingId =this.refs['SelectedUser'].state._id;
        this.props.disableUser(disablingId);
  }
  onChange(e)
  {
      e.preventDefault();
      this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }
  render() {
    const {user, logout} = this.props;
    const styles = require('./Admin.scss');
      var  mappedusers = {};
      if(this.props.auth!= undefined && this.props.auth.user!= undefined && this.props.auth.user._id)
     {
           mappedusers = this.props.auth.user.mapped_users;
     }
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
      data-ctrlid='username' onChange={this.onChange.bind(this)} value={this.state.username}/>
</Row>
<Row>
  <TextField
      hintText="Enter the name"
      floatingLabelText="This is the name"
      floatingLabelFixed={true}
      data-ctrlid='name' onChange={this.onChange.bind(this)} value={this.state.name}/>
</Row>
<Row>
  <TextField
      hintText="Enter the company name"
      floatingLabelText="This is the company name"
      floatingLabelFixed={true}
      data-ctrlid='companyname' onChange={this.onChange.bind(this)} value={this.state.companyname}/>
</Row>
<Row>
<br/>
<label>Role:</label>
<select value={this.state.role} onChange={this.handleChange}>
  <option value="user">User</option>
  <option value="dataoperator">Data Operator</option>
    <option value="admin">Admin</option>
  <option value="editor">Editor</option>
</select>
</Row>
<br/>
<Row>
  <RaisedButton label="Create User" primary={true} onClick={this.handleRegister} />
</Row>
</Col>
<Col md={6}>
</Col>
</Row>
<Row>
<h4>Your Reporters:</h4>
</Row>
<Row>
  <RaisedButton label="Disable User" primary={true} onClick={this.handleDisableUser} />
</Row>
<Row>
<TablePanel data={mappedusers} ref='SelectedUser'/>
</Row>
<Row>
<h4>Your Packages:</h4>
</Row>
<Row>
<TablePanel data={mappedusers}/>
</Row>
</div>

      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Admin);
