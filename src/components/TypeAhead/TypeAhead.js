import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import config from '../../config';

const dataSourceConfig = {
  text: 'text',
  value: 'value',
  resultkey: "resultkey"
};

export default class AutoCompleteExampleSimple extends React.Component {

  constructor(props) {
    super(props);
    this.handleSelect = this.handleSelect.bind(this);
    this.state = {
      dataSource: [],
    };
  }

  get = function (url) {
    // Return a new promise.
    return new Promise(function (resolve, reject) {
      // Do the usual XHR stuff
      var req = new XMLHttpRequest();
      req.open('GET', url);

      req.onload = function () {
        // This is called even on 404 etc
        // so check the status
        if (req.status == 200) {
          // Resolve the promise with the response text
          resolve(JSON.parse(req.response));
        }
        else {
          // Otherwise reject with the status text
          // which will hopefully be a meaningful error
          reject(Error(req.statusText));
        }
      };

      // Handle network errors
      req.onerror = function () {
        reject(Error("Network Error"));
      };

      // Make the request
      req.send();
    });
  }

  Typeahead(a, passstate) {
    var payload = {};
    payload.searchon = "Place";
    payload.searchby = "city";
    payload.search = a;
    return dispatch => {
      fetch(config.svc + '/autocomplete', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload
        })
      }).then(checkStatus)
        .then(parseJSON)
        .then(function (data) {

        })
    }
  }

  autocomplete(a, passstate) {

    var that = this;
    var datalist = [];
    var search = a;
    var searchon = this.props.searchTable;
    passstate.get(config.svc + '/autocomplete/' + searchon + '/' + search).then(function (response) {
      console.log("Success!", response);
      for (var i = 0; i < response.length; i++) {
        var input = {};
        input["text"] = response[i].word;
        input["value"] = response[i].data[0];
        // input.textKey =response[i].word;
        // input.valueKey = response[i].data[0];
        //  input.product = response[i].data;
        const dataSource3 = [
          {textKey: 'Some Text', valueKey: 'someFirstValue'},
          {textKey: 'Some Text', valueKey: 'someSecondValue'},
        ];
        datalist.push(input);
//datalist.push(response[i].word);
      }
      passstate.setState({dataSource: dataSource3});
    }, function (error) {
      console.error("Failed!", error);
    });
  }

  handleUpdateInput = (value) => {
    var self = this;
    var searchby = this.props.searchby;
    var searchon = this.props.searchTable;
    var resultkey = this.props.resultKey;
    var nofilter = this.props.nofilter;
    //  this.Typeahead(value,self);
    var datalist = [];
    var payload = {};
    payload.searchon = searchon;
    payload.searchby = searchby;
    payload.search = value;
    payload.resultKey = resultkey;
    payload.nofilter = nofilter;
    if (value.length > 0) {

      fetch(config.svc + '/complete', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payload
        })
      }).then(checkStatus)
        .then(parseJSON)
        .then(function (data) {
          for (var i = 0; i < data.length; i++) {
            var input = {};
            input["text"] = data[i][searchby];
            input["value"] = data[i];
            input["resultKey"] = data[i][resultkey];
            datalist.push(input);
          }
          self.setState({dataSource: datalist});
        })
    }
  }

  handleSelect(t) {
    this.setState({searchText: t})
  }

  render() {
    var floatinglabel = this.props.floatinglabel != "" ? this.props.floatinglabel : "Enter place name";
    var searchincase = (this.state && this.state.searchText!= undefined) ? this.state.searchText.text:"";
    return (
      <div>
        <AutoComplete
          animated={true}
          floatingLabelText={floatinglabel}
          floatingLabelFixed={true}
          filter={AutoComplete.caseInsensitiveFilter}
          maxSearchResults={10}
          hintText="Type anything"
          dataSource={this.state.dataSource}
          dataSourceConfig={dataSourceConfig}
          onUpdateInput={this.handleUpdateInput}
          searchText={searchincase}
          onNewRequest={this.handleSelect.bind(this)}/>
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

