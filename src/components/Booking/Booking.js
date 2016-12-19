import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import SelectField from 'material-ui/SelectField';
import areIntlLocalesSupported from 'intl-locales-supported';
import MenuItem from 'material-ui/MenuItem';

export default class Booking extends React.Component {
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
    data.dispatch({type: 'ADD_TO_CART', result: fn});
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
      <Row>
        <Col md={12}>
          <Row>
            <h5>We wound love to book this package for you!!</h5>
            <DatePicker
              container="inline"
              floatingLabelText="Choose your travel date"
              hintText="Custom date format"
              firstDayOfWeek={0}
              formatDate={new DateTimeFormat('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              }).format}
            />
          </Row>
          <Row>
            <h4>Travel preferences</h4>
          </Row>
          <Row>
            <SelectField value={this.state.type} data-ctrlid='type' onChange={this.handleSelect.bind(this)}>
              <MenuItem value="standalone" data-ctrlid='type' primaryText="Place"/>
              <MenuItem value="hotel" data-ctrlid='type' primaryText="Hotel"/>
              <MenuItem value="event" data-ctrlid='type' primaryText="Event"/>
            </SelectField>
          </Row>
          <Row>
            <label>If you like to add it to your visit list.</label>
            <RaisedButton label="I want to visit" primary={true} onClick={this.addToCart.bind(this, that, detail)}/>
          </Row>
          <Row>
            <label>If you like to see packages that includes this place.</label>
            <RaisedButton label="View packages" primary={true} onClick={this.addToCart.bind(this, that, detail)}/>
          </Row>
        </Col>
      </Row>
    );
  }
}
