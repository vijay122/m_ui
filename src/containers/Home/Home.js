import React, { Component } from 'react';
import { Link } from 'react-router';
import { CounterButton, GithubButton, GoogleMaps } from 'components';
import config from '../../config';
import Helmet from 'react-helmet';
import Button from 'react-bootstrap/lib/Button';
import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar';
import Grid from 'react-bootstrap/lib/Grid';
import Col from 'react-bootstrap/lib/Col';
import Row from 'react-bootstrap/lib/Row';
import CarouselItem from 'react-bootstrap/lib/CarouselItem';
import Carousel from 'react-bootstrap/lib/Carousel';
import Navbar from 'react-bootstrap/lib/Navbar';
import NavItem from 'react-bootstrap/lib/NavItem';
import Nav from 'react-bootstrap/lib/Nav';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import Thumbnail from 'react-bootstrap/lib/Thumbnail';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';

const buttonsInstance = (
  <ButtonToolbar>
    {/* Standard button */}
    <Button>Default</Button>

    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
    <Button bsStyle="primary">Primary</Button>

    {/* Indicates a successful or positive action */}
    <Button bsStyle="success">Success</Button>

    {/* Contextual button for informational alert messages */}
    <Button bsStyle="info">Info</Button>

    {/* Indicates caution should be taken with this action */}
    <Button bsStyle="warning">Warning</Button>

    {/* Indicates a dangerous or potentially negative action */}
    <Button bsStyle="danger">Danger</Button>

    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
    <Button bsStyle="link">Link</Button>
  </ButtonToolbar>
);


export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    // require the logo image both from client and server
    const logoImage = require('./logo.png');
    return (
      <div className={styles.home}>
        <Helmet title="Home"/>
        <div className="container">
          <Grid>
          <Row>
          <GoogleMaps />
          </Row>
    <Row className="show-grid">
      <Col xs={12} md={8}>
      <code>
              <Carousel>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="http://placehold.it/900x500"/>
      <div className="carousel-caption">
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="http://placehold.it/900x500"/>
      <div className="carousel-caption">
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="http://placehold.it/900x500"/>
      <div className="carousel-caption">
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </CarouselItem>
  </Carousel>
      </code>
      </Col>
      <Col xs={6} md={4}><code> 
      <Thumbnail src="http://placehold.it/400x300" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail></code></Col>
    </Row>

    <Row className="show-grid">
       <h3>Main Land</h3>
    </Row>

    <Row>
    <Col xs={6} md={4}>
      <Thumbnail src="http://placehold.it/400x300" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="http://placehold.it/400x300" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="http://placehold.it/400x300" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    </Row>

   <div className="container">
          <Grid>
           <Row className="show-grid">
      <Col xs={12} md={4}><code>LivelyTrips</code>
      </Col>
      <Col xs={12} md={8}><code>
      <Navbar inverse className={styles.miniNavbar}>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/products">Home</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <NavItem eventKey={1} href="#">Link</NavItem>
        <NavItem eventKey={2} href="#">Link</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.3}>Separated link</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar></code>
  </Col>
    </Row>
      </Grid>
      </div>
       <Row>
    <Col xs={6} md={4}>
      <Thumbnail src="http://placehold.it/400x300" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="http://placehold.it/400x300" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    <Col xs={6} md={4}>
      <Thumbnail src="http://placehold.it/400x300" alt="242x200">
        <h3>Thumbnail label</h3>
        <p>Description</p>
        <p>
          <Button bsStyle="primary">Button</Button>&nbsp;
          <Button bsStyle="default">Button</Button>
        </p>
      </Thumbnail>
    </Col>
    </Row>
  </Grid>

          <dl>
            <dt>Multiple components subscribing to same redux store slice</dt>
            <dd>
              The <code>App.js</code> that wraps all the pages contains an <code>InfoBar</code> component
              that fetches data from the server initially, but allows for the user to refresh the data from
              the client. <code>About.js</code> contains a <code>MiniInfoBar</code> that displays the same
              data.
            </dd>
            <dt>Server-side data loading</dt>
            <dd>
              The <Link to="/widgets">Widgets page</Link> demonstrates how to fetch data asynchronously from
              some source that is needed to complete the server-side rendering. <code>Widgets.js</code>'s
              <code>fetchData()</code> function is called before the widgets page is loaded, on either the server
              or the client, allowing all the widget data to be loaded and ready for the page to render.
            </dd>
            <dt>Data loading errors</dt>
            <dd>
              The <Link to="/widgets">Widgets page</Link> also demonstrates how to deal with data loading
              errors in Redux. The API endpoint that delivers the widget data intentionally fails 33% of
              the time to highlight this. The <code>clientMiddleware</code> sends an error action which
              the <code>widgets</code> reducer picks up and saves to the Redux state for presenting to the user.
            </dd>
            <dt>Session based login</dt>
            <dd>
              On the <Link to="/login">Login page</Link> you can submit a username which will be sent to the server
              and stored in the session. Subsequent refreshes will show that you are still logged in.
            </dd>
            <dt>Redirect after state change</dt>
            <dd>
              After you log in, you will be redirected to a Login Success page. This <strike>magic</strike> logic
              is performed in <code>componentWillReceiveProps()</code> in <code>App.js</code>, but it could
              be done in any component that listens to the appropriate store slice, via Redux's <code>@connect</code>,
              and pulls the router from the context.
            </dd>
            <dt>Auth-required views</dt>
            <dd>
              The aforementioned Login Success page is only visible to you if you are logged in. If you try
              to <Link to="/loginSuccess">go there</Link> when you are not logged in, you will be forwarded back
              to this home page. This <strike>magic</strike> logic is performed by the
              <code>onEnter</code> hook within <code>routes.js</code>.
            </dd>
            <dt>Forms</dt>
            <dd>
              The <Link to="/survey">Survey page</Link> uses the
              still-experimental <a href="https://github.com/erikras/redux-form" target="_blank">redux-form</a> to
              manage form state inside the Redux store. This includes immediate client-side validation.
            </dd>
            <dt>WebSockets / socket.io</dt>
            <dd>
              The <Link to="/chat">Chat</Link> uses the socket.io technology for real-time
              communication between clients. You need to <Link to="/login">login</Link> first.
            </dd>
          </dl>

          <h3>From the author</h3>

          <p>
            I cobbled this together from a wide variety of similar "starter" repositories. As I post this in June 2015,
            all of these libraries are right at the bleeding edge of web development. They may fall out of fashion as
            quickly as they have come into it, but I personally believe that this stack is the future of web development
            and will survive for several years. Im building my new projects like this, and I recommend that you do,
            too.
          </p>

          <p>Thanks for taking the time to check this out.</p>

          <p>– Erik Rasmussen</p>
        </div>
      </div>
    );
  }
}
