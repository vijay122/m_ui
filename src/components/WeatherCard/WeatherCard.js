import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import areIntlLocalesSupported from 'intl-locales-supported';

export default class WeatherCard extends React.Component {
   constructor(props) {
    super(props);
       this.state = {type: null};
  }
  componentWillReceiveProps(newprops)
{
var lat =this.props.detail.loc.coordinates[0];
var lang =this.props.detail.loc.coordinates[1];
var latlang = lat+','+lang;
this.setState({latlang:latlang});

   this.post(process.env.Svc+'/getTemperature/'+latlang).then(function(response) {
  console.log("Success!", response);

  });
  ;
 // var input = newprops.data;
 // var res = newprops.referenceproduct;

  //var kms = inMeters/1000;
  //this.setState({distance:kms})
  // if(newprops.detail.getProductsResult!= undefined)
 // this.setState({'dependencies':newprops.detail.getProductsResult});

}
 post= function(url) {
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
      //  resolve(JSON.parse(req.response));
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
    render()
    {
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
      return(
        <Row>
        <Col md={12}>
<Row>
<h4>Temperature</h4>
</Row>
<Row>
<h5>31</h5>
</Row>

</Col>
</Row>
  );
}
}
