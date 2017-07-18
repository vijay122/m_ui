import React, {Component} from 'react';
import {MiniInfoBar} from '../../components';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export default class About extends Component {

  
  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    var styles={
    width:'100%'
  }
      var initialStyle={
    textTransform:'initial'
  }
  var  centerStyle={
    textAlign:'center'
  }
    const {showKitten} = this.state;
    var date = new Date();
    const kitten = require('./kitten.jpg');
    return (
      <div>
       <Row>
         <Col xs={12} md={4}>
         <img src="https://pbs.twimg.com/media/CNADKw4UEAAwYKw.jpg" style={styles}/>
         </Col>
         <Col xs={12} md={8}>
         <div>
        <h1>Lively Trips - Plan your travel, on the go..</h1>
        <hr/>
          <h2>Knowing of the Right Place:</h2>
        <h3 style={initialStyle}>"A two-wheeled car, pulled by horses, though it has tall and strong wheels cannot travel on seas; nor can ships sailing on the ocean move on the Land."</h3>
 <h3>"Said by tamil poet Thiruvalluvar."</h3>

  <hr/>
         <h2>LivelyTrips can help you know the right place for you.</h2>
<h3 style={initialStyle}>Having Situated in Chennai, a talented team of young and energetic x-mens, working forward to mark their name in the travel and tourism industry with their extraordinary skills to solve the purpose of lively travelling.</h3>
        <h3 style={initialStyle}>We specialize in delivering high quality customized trips that suits the kind of customer we deal. </h3>
        </div>
        </Col>
      </Row>
      <hr/>
      <Row>
      <Col style={centerStyle} xs={12} md={6}>
      <h2>Our Mission Statement</h2>
      <h3 style={initialStyle}>We are committed to establishing lasting relationships with our customers by exceeding their expectations the first time and every time, through consistently delivering outstanding quality of service, experience and value.</h3>
      </Col>
      <Col style={centerStyle} xs={12} md={6}>
      <h2>Our Vision</h2>
      <h3 style={initialStyle}>Plan your  travel on the go in the foreign lands of mother nature with LivelyTrips.</h3>
 
      </Col >
      </Row>
                      <MiniInfoBar time={date}/>
      </div>
    );
  }
}