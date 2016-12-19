import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {MiniInfoBar, GoogleMaps} from '../../components';

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1>About Us</h1>
        <GoogleMaps />
        <Helmet title="About Us"></Helmet>
        <p>Welcome to LIVELYTRIPS.COM</p>
        <p>LIVELYTRIPS.COM created the first travel site on the Internet. We created the travel domain back in 1992
          which also makes us not only the oldest but also the longest continually operating travel site on the
          Internet. No one else comes close. Come find out why millions of people worldwide have used LIVELYTRIPS.COM to
          search out travel information and find the best travel deals.</p>
        <h3>Tours & Activities <span style={{color: '#aaa'}}>(Travel Packages)</span></h3>
        <p>We offer a wide selection of leisure activities and products including over 5,000 sightseeing tours and
          activities in over 400 destinations worldwide. You can book in advance many offerings such as theatre tickets,
          theme park tickets, helicopter tours, sightseeing tours, airport transfers, cruises, mini-vacation packages,
          and so much more. It is simply a lot of fun just browsing these listings to see what is available to enhance
          your next trip.</p>
        <h3>Travel Reviews <span style={{color: '#aaa'}}>(we would love to hear from you..)</span></h3>
        <p>Whether you are visiting a place halfway around the world or a local resident, we love to read your
          first-hand reviews & ratings of travel attractions, accommodations, restaurants, and more (over 30+ travel
          related categories).</p>
        <h3>Online Community</h3>
        <p>Join users worldwide to share travel information, photos, videos, and reviews in our online travel community
          including user country groups and forums.</p>
        <MiniInfoBar />
      </div>
    );
  }
}