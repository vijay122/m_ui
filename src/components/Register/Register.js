import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import areIntlLocalesSupported from 'intl-locales-supported';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {type: null};
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect = (event, index, value) => {
    ;
    this.setState({type: value})
    this.state.type = value;
  }

  addToCart(data, fn, st) {
    // data.dispatch({"ADD_TO_CART",fn});
    //  data.dispatch({ type: 'ADD_TO_CART', result: fn });
    // data.AddToCart(fn);
  }

  render() {
    var that = this.props.that;
    var detail = this.props.detail;
    let DateTimeFormat;

    if (areIntlLocalesSupported(['fr'])) {
      DateTimeFormat = global.Intl.DateTimeFormat;
    } else {
      const IntlPolyfill = require('intl');
      DateTimeFormat = IntlPolyfill.DateTimeFormat;
      require('intl/locale-data/jsonp/fr');
    }
    return (
      <div>
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
          <RaisedButton label="Create Account" primary={true} onClick={this.addToCart.bind(this, that, detail)}/>
        </Row>
      </Col>
      < / Row >
      < / div >
    );
  }
}
