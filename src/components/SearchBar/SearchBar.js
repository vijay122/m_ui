import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Well from 'react-bootstrap/lib/Well';
import React, { Component } from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import { TypeAhead } from '../../components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';
import areIntlLocalesSupported from 'intl-locales-supported';

import { push } from 'react-router-redux';



export default class SearchBar extends React.Component
{

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        var that = this;
         this.state={
          key:"hotels",
          tempprod:["products"],
        };
         // key= 1;
  }
    onChange(e)
  {
      e.preventDefault();
      this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  handleSelect= function(key) {
  //  alert('selected ' + key);
    this.setState({key});
  }

  viewDetails(data,fn,st)
{
  debugger;
  var searchtable = this.state.key;
var searchtype ='city';
  var searchvalue ="";
   searchvalue = this.state.searchText;
//  if(this.refs!= undefined && this.refs.newproduct!= undefined && this.refs.newproduct.state)
  {
  //    searchvalue = this.state.searchText;
    }
  //var placeid= data.props.data._id;
   data.props.dispatch(push('/categories:'+searchtable+ '/searchtype:'+searchtype+'/search:'+searchvalue));
}


  render() {
    var that = this;
     const styles = require('./SearchBar.scss');
     let DateTimeFormat;

if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require('intl');
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require('intl/locale-data/jsonp/fr');
}
const style = {
  margin: 12,
};
    return (
       <Well className={styles.searchPanel}>
      <Row>
        <Col md={12}>
      <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="controlled-tab-example">
        <Tab eventKey="hotels" title="Stay">
        </Tab>
        <Tab eventKey="packages" title="Tours">
        </Tab>
        <Tab eventKey="events" title="Events">
        </Tab>
      </Tabs>
      <Row>
<Col md={3}>
 <DatePicker
 container="inline"
 floatingLabelText="Select the date"
      hintText="Custom date format"
      firstDayOfWeek={0}
      formatDate={new DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format}
    />
</Col>
<Col md={2}>
<TextField
      hintText="City Name"
      floatingLabelText="enter the city name for service"
      floatingLabelFixed={true}
      data-ctrlid="searchText" 
      onChange={that.onChange.bind(that)} 
      value={that.state.searchText} onChange={that.onChange.bind(that)} value={that.state.searchText}/>
</Col>
<Col md={2}>
{this.state.key=="hotels" && this.state.tempprod.map(function(x)
{
  return(
<TextField
      hintText="Number of people"
      floatingLabelText="Number of Adults"
      floatingLabelFixed={true}
      data-ctrlid="name" 
      onChange={that.onChange.bind(this)} 
      value={that.state.name} data-ctrlid='adults' onChange={that.onChange.bind(that)} value={that.state.adults}/>
)})
}
</Col>
<Col md={2}>
{this.state.key=="hotels" && this.state.tempprod.map(function(x)
{
  return(
<TextField
      hintText="Number of rooms required"
      floatingLabelText="Number of Rooms"
      floatingLabelFixed={true}
      data-ctrlid="name" 
      onChange={that.onChange.bind(that)} 
      value={that.state.name} data-ctrlid='rooms' onChange={that.onChange.bind(that)} value={that.state.rooms}/>
)})
}
</Col>
<Col md={3}>
 <RaisedButton label="Search" primary={true} style={style} onClick={this.viewDetails.bind(this,that)}/>
</Col>
</Row>
       </Col>
      </Row>
      </Well>
    );
  }
}