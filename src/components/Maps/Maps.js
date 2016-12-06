/*

var React = require('react');
// require your <Map> component
var Map = require('react-d3-map').Map;
// require your <Marker> component
var MarkerGroup = require('react-d3-map').MarkerGroup;

var data = {
    "type": "Feature",
    "properties": {
      "text": "this is a Point!!!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [122, 23.5]
    }
}

var width = 700;
  var height = 700;
  // set your zoom scale
  var scale = 1200 * 5;
  // min and max of your zoom scale
  var scaleExtent = [1 << 12, 1 << 13]
  // set your center point
  var center = [122, 23.5];
  // set your popupContent
  var popupContent = function(d) { return d.properties.text; }

export default class Maps extends React.Component {
   constructor(props) {
    super(props);
  }
    render()
    {

      return(
 <Map
    width= {width}
    height= {height}
    scale= {scale}
    scaleExtent= {scaleExtent}
    center= {center}>
    <MarkerGroup
      key= {"polygon-test"}
      data= {data}
      popupContent= {popupContent}
      markerClass= {"your-marker-css-class"}/>
  </Map>
      	)
  }
}


*/


import React from 'react';
import {Gmaps, Marker, InfoWindow, Circle} from 'react-gmaps';

export default class Maps extends React.Component {
   constructor(props) {
    debugger;
    super(props);
    
  }
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true
    });
  }

  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render()
  {
    debugger;
    var that = this;
    var markers = this.props.markers;
   var  coords = {
  lat: this.props.markers[0].loc.coordinates[0],
  lng: this.props.markers[0].loc.coordinates[1]
};
    return (
      <Gmaps
        width={'800px'}
        height={'600px'}
        lat={coords.lat}
        lng={coords.lng}
        zoom={12}
        loadingMessage={'Be happy'}
        params={{v: '3.exp', key: 'AIzaSyAVebFb0CRGtfPyIz0VPv9nul-vxRMYt5U'}}
        onMapCreated={this.onMapCreated}>
        {markers!= undefined && markers.length>0 && markers.map(function(point)
          {
                 return(<Marker
          lat={point.loc.coordinates[0]}
          lng={point.loc.coordinates[1]}
          draggable={true}
          onDragEnd={that.onDragEnd} />)
          }
          )
        }
        <InfoWindow
          lat={coords.lat}
          lng={coords.lng}
          content={'Hello, React :)'}
          onCloseClick={this.onCloseClick} />
        <Circle
          lat={coords.lat}
          lng={coords.lng}
          radius={500}
          onClick={this.onClick} />
      </Gmaps>
    );
  }

}