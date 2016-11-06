import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import config from '../../config';

 const dataSourceConfig = {
  text: 'textKey',
  value: 'valueKey',
  product:'product'
};

export default class AutoCompleteExampleSimple extends React.Component {

  constructor(props) {
    super(props);
this.handleSelect= this.handleSelect.bind(this);
    this.state = {
      dataSource: [],
    };
  }
  get= function(url) {
  // Return a new promise.
  return new Promise(function(resolve, reject) {
    // Do the usual XHR stuff
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
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
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}
  Typeahead(a,passstate)
{
  
  var that = this;
  var datalist =[];
  var search = a;
  var searchon =this.props.searchTable;
  passstate.get(config.svc+'/autocomplete/'+searchon+'/'+search).then(function(response) {
  console.log("Success!", response);
  for(var i=0;i<response.length; i++)

  {
    var input = {};
    input["text"] = response[i].word;
        input["value"] =response[i].data[0];
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
  passstate.setState({dataSource:dataSource3});
}, function(error) {
  console.error("Failed!", error);
});
}

  handleUpdateInput = (value) => {
var self = this;
  var searchon =this.props.searchTable;
    //this.Typeahead(value,self);
    this.setState({ searchText: value }) 

  var datalist =[];
  var search = value;
    const dataSource3 = [
  {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
];
 self.setState({dataSource:dataSource3});
  this.get(config.svc+'/autocomplete/'+searchon+'/'+search).then(function(response) {
  console.log("Success!", response);
  for(var i=0;i<response.length; i++)

  {
    var product = {};
    product.image=response[i].data[1][0];
        product._id=response[i].data[0];
         product.loc=response[i].data[2];
    var input = {};
    input["textKey"] = response[i].word;
        input["valueKey"] =response[i].data[0];
    input["product"] =product;
   // input.valueKey = response[i].data[0];
  //  input.product = response[i].data;
datalist.push(input);
//datalist.push(response[i].word);
  }
  self.setState({dataSource:datalist});
}, function(error) {
  console.error("Failed!", error);
});
}


/*
    self.setState({
      dataSource: [
        {textKey: 'Some Text', valueKey: 'someFirstValue'},
  {textKey: 'Some Text', valueKey: 'someSecondValue'},
      ],
    });
   
  };
 */
   handleSelect (t) {
    this.setState( { searchText: t }) 
  }

  render() {
    var floatinglabel =this.props.floatinglabel != ""?this.props.floatinglabel :"Enter place name";
    return (
      <div>
        <AutoComplete
         floatingLabelText={floatinglabel}
         floatingLabelFixed={true}
         hintText="Type anything"
         dataSource={this.state.dataSource}
          dataSourceConfig={dataSourceConfig}
         onUpdateInput={this.handleUpdateInput}
          searchText={this.state.searchText}
          onNewRequest={this.handleSelect.bind(this)}/>
      </div>
    );
  }
}