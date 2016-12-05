
import React, { Component } from 'react';

import { Platform } from 'react-native';

import { Container, Content, Card, CardItem, Text, View, InputGroup, Input, Icon, Button} from 'native-base';

import styles from './styles';

const androidText = 'Login';
const iosText = 'Login';

export default class LoginPage extends Component { // eslint-disable-line

  render() { // eslint-disable-line
    return (
      <Container style={styles.container}>
    
          <Content padder>
          <InputGroup borderType="underline" style={styles.mb}>
            <Input placeholder="Username" />
          </InputGroup>
           <InputGroup borderType="underline" style={styles.mb}>
            <Input placeholder="Password" />
          </InputGroup>
          <Card>
          <CardItem>
            <Button block capitalize primary style={styles.mb15}>
                {(Platform.OS === 'android') ? androidText : iosText}
              </Button>
              </CardItem>
              </Card>
        </Content>
      </Container>
    );
  }
}
