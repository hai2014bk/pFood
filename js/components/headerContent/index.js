import React, { Component } from "react";
import { Image } from "react-native";
import {View, Text, Icon, Button, Left, Right, Body, Header } from "native-base";

import styles from "./styles";
const primary = require("../../themes/variable").brandPrimary;

const headerLogo = require("../../../images/Header-Logo.png");

class HeaderContent extends Component {

  openCart() {
    console.log('Open Cart')
  }
  renderLeft() {
    if (this.props.leftButton != null) {
      if(this.props.textLeft) {
        return (
        <Button transparent onPress={this.props.leftButton}>
          <Text style={{color:'white', fontSize:15}}>{this.props.textLeft}</Text>
        </Button>
      )
      } else {
      return (
        <Button transparent onPress={this.props.leftButton}>
          <Icon style={{color:'white'}} active name={this.props.leftIcon} />
        </Button>
      )}
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
          <Icon style={{color:'white'}} active name="cart" />
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
        <Header style={{ borderBottomWidth:0, backgroundColor: primary }}>
          <Left style={{ flex: 3 }}>
            {this.renderLeft()}
          </Left>
          <Body style={{ justifyContent:'center',alignItems:'center', flex: 3, flexDirection: 'row',}}>
            <Text style={{ textAlign: 'center', flex: 1, color: 'white', fontSize: 15, fontWeight:'bold' }}>{this.props.title}</Text>
          </Body>
          <Right style={{ flex: 3 }}>
            {this.renderRight()}
          </Right>
        </Header>
      );
  }
}

export default HeaderContent;
