import React, { Component } from "react";

import { Entypo } from '@expo/vector-icons';
import { Keyboard, Image, Platform, StatusBar, TouchableOpacity, Alert, Animated, InteractionManager } from "react-native";

import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  Icon,
  View,
  Left,
  Right,
} from "native-base";
import Expo from "expo"
import { Grid, Col } from "react-native-easy-grid";
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";
import styles from "./styles";
import * as mValidate from '../../utils/validate'
import commonColor from "../../../native-base-theme/variables/commonColor";
import { loginClick } from "../../actions/login";
const bgr = require("../../../images/background.png");
const logo = require("../../../images/logoFamous.png")
const primary = require("../../themes/variable").brandPrimary;

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: false,
      click: false,
      disabled: false,
    };
  }
  checkSpace() {
    this.setState({ click: false })
    noneSpaceEmail = this.state.email.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
    this.setState({ email: noneSpaceEmail });
    if (this.checkSpaceAll(this.state.email)) {
      this.emailInput._root.focus()
    }
    if (!this.validateEmail(this.state.email)) {
      this.emailInput._root.focus()
    }

  }
  checkValue() {
    this.setState({ click: false })
    noneSpaceEmail = this.state.email.replace(/^\s+/, "").replace(/\s+$/, "").replace(/\s+/g, " ");
    this.setState({ email: noneSpaceEmail });
    if (!this.state.email) {

      this.emailInput._root.focus()
    } else {
      if (!this.state.password) {
        this.passwordInput._root.focus()
      }
    }
  }

  checkClick() {
    if (this.state.click === false) {
      this.loginClick();
    } else { }
  }

  loginClick() {

    this.setState({ click: true })
    if (this.state.email && this.state.password) {
      if ((!this.checkSpaceAll(this.state.email))) {
        if (!this.validateEmail(this.state.email) || !this.validateUnicode(this.state.email)) {

          setTimeout(() => {
            Alert.alert('', 'Địa chỉ email không hợp lệ',
              [
                { text: 'OK', onPress: () => this.checkSpace() },
              ],
              { cancelable: false }
            )
          }, 200)
        } else {
          let params = {}
          params.email = this.state.email
          params.password = this.state.password
          params.loginType = 'default'
          this.props.loginAction(params)
          this.setState({ isLoading: true })
        }
      }
      else {
        setTimeout(() => {
          Alert.alert(
            '',
            'Các trường không được phép trống'
            ,
            [
              { text: 'OK', onPress: () => this.checkSpace() },
            ],
            { cancelable: false }
          )
        }, 200)
      }
    } else {
      setTimeout(() => {
        Alert.alert(
          '',
          'Các trường không được phép trống',
          [
            { text: 'OK', onPress: () => this.checkValue() },
          ],
          { cancelable: false }
        )
      }, 200)
    }
    Keyboard.dismiss()

  }

  changeDisble() {
    if (this.state.disabled) {
      this.setState({ disabled: false })
    } else {
      this.setState({ disabled: true })
    }
  }


  componentWillReceiveProps(props) {
    console.log('props', props)
    this.setState({ isLoading: false, click: true })
    if (props.login.success) {
      this.props.navigation.navigate('Drawer')
    }
    else {
      setTimeout(() => { Alert.alert('Tài khoản hoặc mật khẩu không chính xác') }, 100)
    }
  }

  async loginFb() {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1237620896349287', {
      permissions: ['public_profile', 'email'], behavior: 'browser'
    });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      let params = {}
      params.accessToken = token
      params.loginType = 'Facebook'
      this.props.loginAction(params)
    }
  }

  async loginGoogle() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '514654911028-9ougk5pan5mdb1rrnk3va5uqnpdsu3b1.apps.googleusercontent.com',
        iosClientId: '514654911028-9ougk5pan5mdb1rrnk3va5uqnpdsu3b1.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
      console.log('result', result)
      if (result.type === 'success') {

        let params = {}
        params.accessToken = result.accessToken
        params.loginType = 'Google'
        console.log('params', params)
        this.props.loginAction(params)
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container>
        <StatusBar
          backgroundColor={commonColor.statusBarColor}
          barStyle="light-content"
        />

        <Image source={bgr} style={styles.background}>
          <Content keyboardShouldPersistTaps='handled'>
            <Spinner visible={this.state.isLoading} />

            <View style={styles.bg}>
              <Image source={logo} resizeMode='contain' style={{ marginBottom: 60, marginTop: 80, width: '95%' }} />

              <Input main

                ref={(email) => { this.emailInput = email }}
                placeholder="Tên đăng nhập"
                placeholderTextColor='#f4e6db'
                autoCapitalize='none'
                autoCorrect={false}
                value={this.state.email}
                onChangeText={email => this.setState({ email })}
                style={styles.input}
              />


              <Input main
                ref={(password) => { this.passwordInput = password }}
                placeholder="Mật khẩu"
                placeholderTextColor='#f4e6db'
                secureTextEntry
                style={styles.textInput}

                onChangeText={password => this.setState({ password })}
                style={styles.input}

              />
              <TouchableOpacity
                rounded
                style={styles.loginBtn}
                onPress={() => this.checkClick()}
              >
                <Text
                  style={
                    { fontSize: 20, color: "white" }
                  }
                >
                  Đăng Nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 15 }}
                disabled={this.state.disabled}
                onPress={() => {
                  this.setState({ disabled: true }),
                    navigation.navigate("ForgetPassword"),
                    InteractionManager.runAfterInteractions(() => {
                      this.setState({ disabled: false })
                    })
                }}
              >
                <Text
                  style={styles.forgot}
                >
                  Quên mật khẩu?
              </Text>
              </TouchableOpacity>
              <Text style={styles.questionText}>Hoặc đăng nhập với</Text>
              <View style={
                {
                  flex: 1, flexDirection: "row",
                  justifyContent: 'space-between',
                  height: 60,
                  width: '60%'
                }
              }>

                <TouchableOpacity
                  style={
                    styles.icon
                  }
                  onPress={() => this.loginGoogle()}
                >
                  <Entypo name="google--with-circle" size={50} color='white' />
                </TouchableOpacity>
                <TouchableOpacity
                  transparent
                  style={styles.icon
                  }
                  onPress={() => this.loginFb()}
                >

                  <Entypo name="facebook-with-circle" size={50} color='white' />
                </TouchableOpacity>

                <TouchableOpacity
                  transparent
                  style={styles.icon}
                >
                  <Entypo name="flickr-with-circle" size={50} color='white' />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', marginTop: 20 }} >
                <Text style={styles.dontac}>{"Không có tài khoản?  "}</Text>
                <TouchableOpacity
                  style={styles.regis}
                  disabled={this.state.disabled}
                  onPress={() => {
                    this.setState({ disabled: true }),
                    navigation.navigate("SignUp"),
                    InteractionManager.runAfterInteractions(() => {
                      this.setState({ disabled: false })
                    })
                  }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: 'bold', color: "white", textDecorationLine: 'underline' }}>
                    Đăng Kí Ngay
                </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
        </Image>

      </Container>
    );
  }
  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  validateUnicode(email) {
    var regex = /^([a-z0-9\+_\-]+)(\.[a-z0-9\+_\-]+)*@([a-z0-9\-]+\.)+[a-z]{2,6}$/gi
    if (regex.test(email)) {
      return true;
    }
    return false;
  }
  checkSpaceAll(text) {
    if (!text.replace(/\s/g, '').length) {
      return true
    }
    return false
  }
}

function bindAction(dispatch) {
  return {
    loginAction: (param) => dispatch(loginClick(param)),
  };
}
const mapStateToProps = state => ({
  login: state.login,
});
export default connect(mapStateToProps, bindAction)(Login);