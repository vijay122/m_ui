import React from 'react';
import {TransitionMotion, spring} from 'react-motion';
import geolib  from 'geolib';
import {push} from 'react-router-redux';

//Prsets for spring parameters
const presets = {
  noWobble: {stiffness: 170, damping: 26}, // the default, if nothing provided
  mySpring: {stiffness: 120, damping: 14},
  wobbly: {stiffness: 180, damping: 12},
  stiff: {stiffness: 210, damping: 20},
};

export default class SidebarList extends React.Component {
  //This is a stateless UI element, no need for state, just render by props
  // actual animation-related logic
  constructor(props) {
    super(props);
  }

  getDefaultStyles() {
  	console.log(this);
    return this.props.videos.map(video => ({
      key: video._id,
      data: video,
      style: {
        height: 0, 
        opacity: 0,
        marginTop: 0,
      }
    }));
  }

  getStyles() {

    const {videos,springValue} = this.props;
    let springs;
    if(springValue== undefined)
    springs=155;
    return videos.map((video, i) => {
      return {
         key: video._id,
        data: video,
        style: {
          height: spring(155, presets.mySpring),
          opacity: spring(1, presets.mySpring),
          marginTop: 10,
        }
      };
    });
  }

  willEnter(param) {
    return {
      height: 0,
      opacity: 0,
      marginTop: 10
    };
  }

  willLeave() {
    return {
      height: 0,
      opacity: 0,
      marginTop: 10,
    };
  }

  render() {
    const {videos,referenceproduct,dispatch} = this.props;
    return (
        <div>
          <TransitionMotion
            defaultStyles={this.getDefaultStyles()}
            styles={this.getStyles()}
            willLeave={this.willLeave}
            willEnter={this.willEnter}>
            {styles =>
              <ul className="video-list" style={{
                listStyleType: 'none',
                paddingLeft: 0,
              }}>
                {
                  styles.map(function(x){
                     return (<SidebarListItem key={x.key} style={x.style} dispatch={dispatch} referenceproduct={referenceproduct} data={x.data}/>)
                  }
                )}
              </ul>
            }
          </TransitionMotion>
        </div>
    );
  }
}

export class SidebarListItem extends React.Component {
  //This is a stateless UI element, no need for state, just render by props
  // actual animation-related logic
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    var input = this.props.data.loc.coordinates;
    var refprod = this.props.referenceproduct;

    var inMeters = "";
    if (refprod != undefined && refprod.loc != undefined && refprod.loc.coordinates[0]) {
      inMeters = geolib.getDistance(
        {latitude: input[1], longitude: input[0]},
        {latitude: refprod.loc.coordinates[1], longitude: refprod.loc.coordinates[0]}, function () {
        }
      );
    }

    var kms = inMeters / 1000;
    this.setState({distance: kms})
  }

  componentWillReceiveProps(newprops) {
    if (newprops != undefined && newprops.data != undefined && newprops.data.loc != undefined && newprops.data.loc.coordinates != undefined) {
      var input = newprops.data.loc.coordinates;
      var refprod = newprops.referenceproduct;
      var inMeters = "";
      if (refprod != undefined && refprod.loc != undefined && refprod.loc.coordinates[1] != undefined) {
        inMeters = geolib.getDistance(
          {latitude: input[1], longitude: input[0]},
          {latitude: refprod.loc.coordinates[1], longitude: refprod.loc.coordinates[0]}, function () {
          }
        );
      }
      var kms = inMeters / 1000;
      this.setState({distance: kms})
    }
  }

  handleClick(data, fn, st) {
    var placeid = data.props.data._id;
    var category = "products";
    this.props.dispatch(push('/detail/id:' + placeid + "/category:" + category));
  }
  render() {
        var ty = this;
     var distance = (this.state != null && this.state.distance != undefined) ? this.state.distance + " kms" : "";
    const displayItem = this.props.data;
    return (
         <li key={1} style={this.props.style}>
                              <label>{displayItem.name} </label>
                    <div className="view" style={{
                      height: 115,
                    }}>
                      <img onClick={this.handleClick.bind(this, ty)} src={displayItem.image[0]} alt={displayItem.name} className="img-responsive" style={{
                        position: 'absolute',
                        margin: 5,
                        width: 'inherit',
                        height: 'inherit',
                      }}/>
                      <div style={{
                       float:'right'
                      }}>
                      {distance}
                      </div>
                    </div>
                  </li>
    )
}
}

