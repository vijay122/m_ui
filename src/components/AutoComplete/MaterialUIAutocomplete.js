import React, {Component} from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import getMuiTheme        from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider   from 'material-ui/styles/MuiThemeProvider';
import JSONP              from 'jsonp';

const googleAutoSuggestURL = `
  //suggestqueries.google.com/complete/search?client=youtube&ds=yt&q=`;

const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
  product: 'product'
};

class MaterialUIAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.onUpdateInput = this.onUpdateInput.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.state = {
      dataSource: [],
      inputValue: ''
    }
  }

  onUpdateInput(inputValue) {
    const self = this;
    this.setState({
      inputValue: inputValue
    }, function () {
      self.performSearch();
    });
  }

  handleUpdateInput = (value) => {
    var self = this;
    //this.Typeahead(value,self);
    this.setState({searchText: value})

    var datalist = [];
    var search = value;
    const dataSource3 = [
      {textKey: 'Some Text', valueKey: 'someFirstValue'},
      {textKey: 'Some Text', valueKey: 'someSecondValue'},
    ];
    self.setState({dataSource: dataSource3});
    this.get(process.env.Svc + '/autocomplete/' + search).then(function (response) {
      console.log("Success!", response);
      for (var i = 0; i < response.length; i++) {
        var product = {};
        product.image = response[i].data[1][0];
        product._id = response[i].data[0];
        product.loc = response[i].data[2];
        var input = {};
        input["textKey"] = response[i].word;
        input["valueKey"] = response[i].data[0];
        input["product"] = product;
        // input.valueKey = response[i].data[0];
        //  input.product = response[i].data;
        datalist.push(input);
//datalist.push(response[i].word);
      }
      self.setState({dataSource: datalist});
    }, function (error) {
      console.error("Failed!", error);
    });
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

  performSearch() {
    const
      self = this,
      url = googleAutoSuggestURL + this.state.inputValue;

    if (this.state.inputValue !== '') {
      JSONP(url, function (error, data) {
        let searchResults, retrievedSearchTerms;

        if (error) return error;

        searchResults = data[1];

        retrievedSearchTerms = searchResults.map(function (result) {
          return result[0];
        });

        self.setState({
          dataSource: retrievedSearchTerms
        });
      });
    }
  }

  render() {
    return <MuiThemeProvider muiTheme={getMuiTheme()}>
      <AutoComplete
        dataSource={this.state.dataSource}
        dataSourceConfig={dataSourceConfig}
        onUpdateInput={this.handleUpdateInput}/>
    </MuiThemeProvider>
  }
}

export default MaterialUIAutocomplete;