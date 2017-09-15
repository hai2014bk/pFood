import React, { Component } from "react";
import { AsyncStorage, TouchableOpacity, InteractionManager, Image } from "react-native";
import { View, Text, Icon, Button, Left, Right, Body, Header } from "native-base";
import * as mConstants from '../../utils/Constants'
import { connect } from "react-redux";

import styles from "./styles";
const primary = require("../../themes/variable").brandPrimary;

const headerLogo = require("../../../images/Header-Logo.png");

class HeaderContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      count: 0
    };
  }
  async cartCount() {
    var data = []
    const value = await AsyncStorage.getItem(mConstants.CART);
    if (value !== null) {
      data = JSON.parse(value)
      this.setState({ count: data.length })
    }
  }
  componentDidMount() {
    this.cartCount()
  }
  componentWillReceiveProps(props) {
    if(props.reRender.render){
      this.cartCount()
    }
  }

  openCart() {
    this.setState({ disabled: true })
    this.props.navi.navigate('Cart')
    InteractionManager.runAfterInteractions(() => {
      this.setState({ disabled: false })
    })
  }
  renderSecondRight() {
    if (this.props.secondRightBtn) {
      return (
        <Button transparent onPress={this.props.secondRightBtn}>
          <Icon style={{ color: 'white' }} active name={this.props.secondRightBtnIcon} />
        </Button>
      )
    } else {
      <View>
      </View>
    }

  }
  renderLeft() {
    if (this.props.leftButton != null) {
      if (this.props.textLeft) {
        return (
          <TouchableOpacity style={{marginLeft:-10}} transparent onPress={this.props.leftButton}>
            <Text style={{marginLeft:10, color: 'white', fontSize: 13 }}>{this.props.textLeft}</Text>
          </TouchableOpacity>
        )
      } else {
        return (
          <Button transparent onPress={this.props.leftButton}>
            <Icon style={{ color: 'white', flex: 1 }} active name={this.props.leftIcon} />
          </Button>
        )
      }
    } else {
      return (
        <View>
        </View>
      )
    }
  }
  renderRight() {
    var count = this.state.count
    console.log('2321321321', count)
    if (this.props.rightButton) {
      console.log('right butrton')
      if (this.props.customRight) {
        return (
          <Button disabled={this.state.disabled} transparent onPress={this.props.customRight}>
            <Icon style={{ color: 'white' }} active name={this.props.rightIcon} />
          </Button>
        )
      } else {
        if (count > 0) {
          console.log('knkldnfmalow')
          return (
            <Button transparent disabled={this.state.disabled} onPress={() => { this.openCart() }}>
              <View >
                <Icon style={{ color: 'white' }} active name="cart" />
                <View overflow="hidden"
                  style={{
                    height: 18, borderWidth: 1,
                    borderRadius: 9,
                    borderColor: 'red',
                    backgroundColor:'red',
                    width: 18, position: 'absolute', top: -6, right: -10, alignSelf: 'flex-end'
                  }}>
                  <Text style={{ fontSize: 12, textAlign:'center'}}>{count}</Text>
                </View>
              </View>
            </Button>
          )
        }
        return (
          <Button transparent disabled={this.state.disabled} onPress={() => { this.openCart() }}>
            <Icon style={{ color: 'white' }} active name="cart" />
          </Button>
        )
      }
    } else {
      return (
        <View>
        </View>
      )
    }
  }
  render() {
    console.log('mvgfdmsnkvbjswero')
    if (this.props.secondRightBtn) {
      return (
        <Header style={{ borderBottomWidth: 0, backgroundColor: primary }}>
          <Left style={{ flex: 1, marginLeft:0 }}>
            {this.renderLeft()}
          </Left>
          <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 2, flexDirection: 'row', }}>
            <Text style={{ textAlign: 'center', flex: 1, color: 'white', fontSize: 15, fontWeight: 'bold' }}>{this.props.title}</Text>
          </Body>
          <Right style={{ flex: 1, flexDirection: 'row' }}>
            {this.renderSecondRight()}
            {this.renderRight()}
          </Right>
        </Header>
      );
    }
    return (
      <Header style={{ borderBottomWidth: 0, backgroundColor: primary }}>
        <Left style={{ flex: 1 }}>
          {this.renderLeft()}
        </Left>
        <Body style={{ justifyContent: 'center', alignItems: 'center', flex: 3, flexDirection: 'row', }}>
          <Text style={{ textAlign: 'center', flex: 1, color: 'white', fontSize: 13, fontWeight: 'bold' }}>{this.props.title}</Text>
        </Body>
        <Right style={{ flex: 1 }}>
          {this.renderRight()}
        </Right>
      </Header >
    );
  }
}


const mapStateToProps = state => ({
  reRender: state.reRender,
});

export default connect(mapStateToProps)(HeaderContent);
