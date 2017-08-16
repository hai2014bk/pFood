import React, { Component } from "react";
import { Image } from "react-native";
import {Text, Icon, Button, Left, Right, Body, Header } from "native-base";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");

class HeaderContent extends Component {

	openCart(){
		console.log('Open Cart')
	}
	render() {
    if(this.props.leftButton != null) {
      return (
        <Header style={{ backgroundColor: '#2d456b' }}>
          <Left style={{ flex: 1 }}>
            <Button transparent onPress={this.props.leftButton}>
              <Icon active name={this.props.leftIcon} />
            </Button>
          </Left>
          <Body style={{ flex: 4, flexDirection: 'row' }}>
            <Text style={{ textAlign: 'center', flex: 1, color: '#61b635', fontSize: 17 }}>{this.props.title}</Text>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent onPress={()=>this.openCart()}>
              <Icon active name="cart" />
            </Button>
          </Right>
        </Header>
      );
  } else {
    return (
        <Header style={{ backgroundColor: '#2d456b' }}>
          <Left style={{ flex: 1 }}>
          </Left>
          <Body style={{ flex: 4, flexDirection: 'row' }}>
            <Text style={{ textAlign: 'center', flex: 1, color: '#61b635', fontSize: 17 }}>{this.props.title}</Text>
          </Body>
          <Right style={{ flex: 1 }}>
            <Button transparent onPress={()=>this.openCart()}>
              <Icon active name="cart" />
            </Button>
          </Right>
        </Header>
      );
  }
}
}

export default HeaderContent;
