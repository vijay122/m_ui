import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

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
  ;
  var that = this;
  var datalist =[];
  var search = a;
  passstate.get('http://localhost:8000/autocomplete/'+search).then(function(response) {
  console.log("Success!", response);
  for(var i=0;i<response.length; i++)

  {
    var input = {};
    input.textKey =response[i].name;
    input.valueKey = response[i].value;
    input.product = response[i];
datalist.push(input);
  }
  passstate.setState({dataSource:datalist});
}, function(error) {
  console.error("Failed!", error);
});
}

  handleUpdateInput = (value) => {
    this.Typeahead(value,this);
    this.setState({ searchText: value }) 
   /* this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
*/
  };
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