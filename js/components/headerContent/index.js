import React, { Component } from "react";
import { Image } from "react-native";
import {View, Text, Icon, Button, Left, Right, Body, Header } from "native-base";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");

class HeaderContent extends Component {

  openCart() {
    console.log('Open Cart')
  }
  renderLeft() {
    if (this.props.leftButton != null) {
      return (
        <Button transparent onPress={this.props.leftButton}>
          <Icon active name={this.props.leftIcon} />
        </Button>
      )
    } else {
      return (
        <View>
        </View>
      )
    }
  }
  renderRight() {
    if (this.props.rightButton) {
      return (
        <Button transparent onPress={() => this.openCart()}>
          <Icon active name="cart" />
        </Button>
      )
    } else {
      return (
        <View>
        </View>
      )
    }
  }
  render() {
      return (
        <Header style={{ backgroundColor: '#2d456b' }}>
          <Left style={{ flex: 1 }}>
            {this.renderLeft()}
          </Left>
          <Body style={{ flex: 4, flexDirection: 'row' }}>
            <Text style={{ textAlign: 'center', flex: 1, color: '#61b635', fontSize: 17 }}>{this.props.title}</Text>
          </Body>
          <Right style={{ flex: 1 }}>
            {this.renderRight()}
          </Right>
        </Header>
      );
  }
}

export default HeaderContent;
