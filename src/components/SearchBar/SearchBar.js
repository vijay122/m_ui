import Tabs from 'react-bootstrap/lib/Tabs';
import Tab from 'react-bootstrap/lib/Tab';
import Well from 'react-bootstrap/lib/Well';
import React, {Component} from 'react';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import {TypeAhead} from '../../components';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import areIntlLocalesSupported from 'intl-locales-supported';

import {push} from 'react-router-redux';

var querystring = require('querystring');

var qss = require('querystrings')


export default class SearchBar extends React.Component {

  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    var that = this;
    this.state = {
      key: "Hotel",
      tempprod: ["products"],
    };
    // key= 1;
  }

  serialize = function (obj) {
    var str = [];
    for (var p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
    return str.join("&");
  }

  onChange(e) {
    e.preventDefault();
    this.state[e.currentTarget.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  handleSelect = function (key) {
    //  alert('selected ' + key);
    this.setState({key});
  }

  viewDetails(data, fn, st) {
    debugger;
        var searchArray =[];
        var keyvaluearr=[];
         var searchTabelArray =[];
    var searchtable = this.state.key;
    var searchtype ;
    var searchvalue = "";
    let result ;
    if(this.refs["searched_id"]!= undefined && this.refs["searched_id"].state!= undefined && this.refs["searched_id"].state.searchText!= undefined && this.refs["searched_id"].state.searchText.resultKey != undefined)
    {
      searchtype= this.refs["searched_id"].props.resultKey;
      result = this.refs["searched_id"].state.searchText.resultKey;
        var ip = [];
        ip.push(searchtype);
         ip.push(result);
          keyvaluearr.push(ip);
         // searchArray.push(keyvaluearr);
     //result = querystring.stringify(this.refs["searched_id"].state.searchText.resultKey);

    }
   if(this.refs["searched_id_city"]!= undefined && this.refs["searched_id_city"].state!= undefined && this.refs["searched_id_city"].state.searchText)
    {
     searchtype = this.refs["searched_id_city"].props.resultKey;
           result = this.refs["searched_id_city"].state.searchText.resultKey;
            var ip = [];
        ip.push(searchtype);
         ip.push(result);
          keyvaluearr.push(ip);

    }
      searchArray.push(keyvaluearr);

    var searchOptions={};
    searchOptions.searchOn = searchtable;
    searchOptions.search = searchArray;
     let params = querystring.stringify(searchOptions);
      params = qss.stringify({
    searchOptions: keyvaluearr
})
     data.props.dispatch(push('/categories:' + searchtable + '/searchOptions:' + params));
    //var placeid= data.props.data._id;
    // data.props.dispatch(push('/categories:' + searchtable + '/searchtype:' + searchtype + '/search:' + result));
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
              <Tab eventKey="Hotel" title="Stay">
              </Tab>
              <Tab eventKey="Package" title="Tours">
              </Tab>
              <Tab eventKey="Event" title="Events">
              </Tab>
              <Tab eventKey="Place" title="Places">
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
                <TypeAhead ref="searched_id_city" searchTable={this.state.key} floatinglabel="Search City" searchby="city"
                           resultKey="city"/>
              </Col>
              <Col md={2}>
                <TypeAhead ref="searched_id" searchTable={this.state.key} floatinglabel="Search State" searchby="state"
                           resultKey="state"/>
              </Col>
              <Col md={2}>
                {this.state.key == "Hotel" && this.state.tempprod.map(function (x) {
                  return (
                    <TextField
                      hintText="Number of people"
                      floatingLabelText="Number of Adults"
                      floatingLabelFixed={true}
                      data-ctrlid="name"
                      key={x}
                      onChange={that.onChange.bind(this)}
                      value={that.state.name} data-ctrlid='adults' onChange={that.onChange.bind(that)}
                      value={that.state.adults}/>
                  )
                })
                }
              </Col>
              <Col md={2}>
                {this.state.key == "Hotel" && this.state.tempprod.map(function (x) {
                  return (
                    <TextField
                      hintText="Number of rooms required"
                      floatingLabelText="Number of Rooms"
                      floatingLabelFixed={true}
                      data-ctrlid="name"
                      key={x}
                      onChange={that.onChange.bind(that)}
                      value={that.state.name} data-ctrlid='rooms' onChange={that.onChange.bind(that)}
                      value={that.state.rooms}/>
                  )
                })
                }
              </Col>
              <Col md={3}>
                <RaisedButton label="Search" primary={true} style={style} onClick={this.viewDetails.bind(this, that)}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Well>
    );
  }
}