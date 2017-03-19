import {Component} from 'react';
import {push} from 'react-router-redux';
export default class VisitIcons extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.product = props.menu;
    if (props.menu == undefined) {
      this.state.product = {};
      this.state.image = [];
      this.state.image[0] = 'empty';
      this.state.name = "";
    }
  }

  handleClick(data, fn, st) {

    var placeid = data.props.menu._id;
    data.props.dispatch(push('/detail/id:' + placeid + "/category:products"));
  }

  resizeImage(url, height, width) {
    var filter = 'h_' + height + ',w_' + width + '/';
    var str = url;
   if(Array.isArray(url))
   {
    str = url[0];
   }
    var index = str.indexOf("upload/") + 7;
    var rest = str.substr(0, index) + filter + str.substr(index);
    return rest;
  }

  render() {
const styles = require('./VisitIcons.scss');
    var product = this.state.product;
    var ty = this;
    var prodimage = product.image != undefined ? product.image : product.scrollimage;
    var imagesrc = this.resizeImage(prodimage, 80, 80)
    return (
      <div className={styles.tooltip}>
      <img src={imagesrc} onClick={this.handleClick.bind(product, ty)} />
            <span className={styles.tooltiptext}>{product.name}</span>
            </div>
    );
  }
}