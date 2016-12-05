
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Header, Content, Title, View, Button, Icon, Tabs, List } from 'native-base';

import { openDrawer } from '../../actions/drawer';
import navigateTo from '../../actions/sideBarNav';
import myTheme from '../../themes/base-theme';
import NHSearchbar from "../../components/searchbar";
import ProductListItem from "../../components/productListItem/index";

class SearchScreen extends Component {  // eslint-disable-line

  static propTypes = {
    openDrawer: React.PropTypes.func,
    navigateTo:React.prop
  }

  constructor(props) {
    super(props);
        this._navigateTo = this._navigateTo.bind(this);
  }

  _navigateTo(route,data) {
    debugger;
    this.props.navigateTo(route, 'home',data);
  }

  render() {
    debugger;
    var title = this.props.title;
    return (
      <Container theme={myTheme}>
        <Header style={{ elevation: 0 }}>
          <Title>{title}</Title>
          <Button transparent onPress={this.props.openDrawer}>
            <Icon name="ios-menu" />
          </Button>
        </Header>
        <Content>
        <View>
         <NHSearchbar />
           <List>
        <ProductListItem navigateTo={this._navigateTo}/>
        </List>
         <Button block rounded onPress={this.props.openDrawer}>Back</Button>
        </View>
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    openDrawer: () => dispatch(openDrawer()),
    navigateTo: (route, homeRoute,data) => dispatch(navigateTo(route, homeRoute,data)),
  };
}

const mapStateToProps = state => ({
  navigation: state.cardNavigation,
});

export default connect(mapStateToProps, bindAction)(SearchScreen);
