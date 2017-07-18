import React, {Component} from 'react';
import config from '../../config';
import Row from 'react-bootstrap/lib/Row';
import FormControl from 'react-bootstrap/lib/FormControl';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';
import Image from 'react-bootstrap/lib/Image';
import Col from 'react-bootstrap/lib/Col';

export default class ImageText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var state = this.state;
    let url = this.props.image;
     let title = this.props.title;
     let index = (this.props.index!= undefined)? this.props.index +1:"";
      const style = require('./ImageText.scss');
          let content = this.props.content;
    return (
      <div>
      <Row>
      <h1>{index}.{title}</h1>
      </Row>
       <Row>
       <Col xs={12} md={12}>
       <Image src={url} responsive />
       </Col>
        <Col xs={12} md={12}>
       <div className={style.content}>{content}</div>
       </Col>

       </Row>
      </div>
    );
  }
}

