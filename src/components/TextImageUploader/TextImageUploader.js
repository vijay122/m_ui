import React, {Component} from 'react';
import Row from 'react-bootstrap/lib/Row';
import FileUploader from '../FileUploader/FileUploader';
import Col from 'react-bootstrap/lib/Col';
import TextField from 'material-ui/TextField';

export default class TextImageUploader extends Component {
  constructor(props) {
     super(props);
    this.state ={};
  }

  addItem()
  {
      event.preventDefault();
    var payload = {};
  payload.name = this.state.title;
  payload.body = this.state.content;
  payload.email = this.state.image;
  this.refs['imgToClear'].value ="";

  this.props.dispatch({type: 'ADD_POST_ITEM', result: payload});
  }
    onChange(e) {
    this.state[e.target.attributes["data-ctrlid"].value] = e.currentTarget.value;
  }

  render() {
       this.onChange = this.onChange.bind(this);
    var state = this.state;
    var disabledState = false;
    const style = require('./TextImageUploader.scss');
    return (
      <div>
      <Row>
      <TextField
              className={style.inputFullWidth}
               floatingLabelText="Title of the post"
                  floatingLabelFixed={true}
              hintText="Post Title"
              data-ctrlid='title'
              disabled={disabledState}
              onChange={this.onChange.bind(this)}/>
      </Row>
       <Row>
       <Col xs={12} md={6}>

              <TextField
            className={style.inputFullWidth}
            floatingLabelText="Main content:"
                floatingLabelFixed={true}
            hintText="Blog Content"
            multiLine={true}
                          disabled={disabledState}
            data-ctrlid='content'
            rows={2}
            onChange={this.onChange.bind(this)}
            rowsMax={4}
          />
       </Col>
        <Col xs={12} md={6}>
      <FileUploader data-ctrlid='image' ref='image'/>
       </Col>

       </Row>
       
      </div>
    );
  }
}

