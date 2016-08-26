import React, { Component } from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export class CalanderDayRow extends Component {
  render() {
      const styles = require('./Calendar.scss');
      var rows = [];
     for(var count=1; count<7; count++)
     {
      rows.push(<Col md={1} className={styles.datacell}><CalanderDay day={count}/></Col>)
     }
return(
  <tr>
  {rows}
  </tr>
      );
  }
}

export class CalanderDay extends Component {
  render() {
 var id =   this.props.day;
return(
  <td>
  <div>
<label>{id}</label>
  </div>
  </td>
      );
  }
}

export class Event extends Component {
  render() {
return(
  <div>
  </div>
      );
  }
}

export default class CalanderLayout extends Component {
  render() {
      const styles = require('./Calendar.scss');
     var rows = [];
     for(var count=0; count<7; count++)
     {
      rows.push(<Row> <CalanderDayRow /> </Row>)
     }
    
return(
  <Row>
  <Col >
    <Row className={styles.thead}>
    <Col md={1} className={styles.headercell}>
        <label>Sunday</label>
        </Col>
            <Col md={1} className={styles.headercell}>
            <label>Monday</label>
            </Col>
            <Col md={1} className={styles.headercell}>
            <label>Tuesday</label>
            </Col>
            <Col md={1} className={styles.headercell}>
            <label>Wednesday</label>
            </Col>
            <Col md={1} className={styles.headercell}>
            <label>Thursday</label>
            </Col>
            <Col md={1} className={styles.headercell}>
            <label>Friday</label>
            </Col>
            <Col md={1} className={styles.headercell}>
            <label>Saturday</label>
            </Col>
        </Row>

        <Row className={styles.tbody}>{rows}</Row>
      </Col>
      </Row>
      );
  }
}