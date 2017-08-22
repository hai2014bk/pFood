import React, { Component } from "react";


import {  Keyboard, Image, Platform, StatusBar, TouchableOpacity,Alert } from "react-native";

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
import { Grid, Col } from "react-native-easy-grid";
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";
import styles from "./styles";
import * as mValidate from '../../utils/validate'
import commonColor from "../../../native-base-theme/variables/commonColor";
import { loginClick } from "../../actions/login";
const bgr = require("../../../images/background.png");
const logo = require("../../../images/logoFamous.png")



class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isLoading: false
    };
  }
  loginClick() {

    if (this.state.email && this.state.password) {
      if (!this.validateEmail(this.state.email)) {
        setTimeout(()=>{Alert.alert('', 'Địa chỉ email không hợp lệ')}, 200)
    } else{
    let params = {}
    params.email = this.state.email
    params.password = this.state.password
    this.props.loginAction(params)
    this.setState({ isLoading: true })
  }
  }
  else {
   setTimeout(()=>{Alert.alert('', 'Các trường không được bỏ trống')}, 200)
 }


    Keyboard.dismiss()


  }
  _hideloading() {
    this.setState({
      visible: false
    });
  }
  showAlert(title, content, button) {
  Alert.alert(title, content, button, { cancelable: false });
}

  componentWillReceiveProps(props) {
    this.setState({ isLoading: false })
    if (props.login.success)
    {
      this.props.navigation.navigate('Drawer')
    }
    else {
      setTimeout(() => { alert('Tài khoản hoặc mật khẩu không chính xác') }, 100)
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
              <Image source={logo} resizeMode='contain' style={{marginBottom:60, marginTop:80, width:'95%'}} />
              <Item rounded style={styles.inputGrp}>
                <Input
                {...this.props}
          ref={ref => {
            this.email = ref;
          }}
                  placeholder="Tên đăng nhập"
                  placeholderTextColor='#f4e6db'
                  onChangeText={email=> this.setState({ email })}
                  style={styles.input}
                />
              </Item>
              <Item rounded style={styles.inputGrp}>

                <Input
          {...this.props}
          ref={ref => {
            this.password = ref;
          }}
                  placeholder="Mật khẩu"
                  placeholderTextColor='#f4e6db'
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                  style={styles.input}

                />
              </Item>
              <Button
                rounded
                style={styles.loginBtn}
                onPress={() => this.loginClick()}
              >
              <Text
              style={
              { fontSize:16,color:"white"}
              }
              >
                Đăng nhập
                </Text>
            </Button>
            <TouchableOpacity
              style={{ marginTop: 10, marginBottom: 5 }}
              onPress={() => navigation.navigate("ForgetPassword")}
            >
              <Text
                style={styles.forgot}
              >
                Quên mật khẩu
              </Text>
            </TouchableOpacity>



              <Text style={styles.questionText}>Hoặc đăng nhập với</Text>

              <View style={{ flex: 1, flexDirection: "row", height: 60 }}>
                <View style={{ flex: 2, alignItems: 'center' }} />
                <TouchableOpacity
                  bordered
                  style={
                    styles.button
                  }
                >
                  <Icon
                    name="logo-facebook"
                    style={{ fontSize: 40 }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  transparent
                  style={styles.button
                  }
                >
                  <Icon
                    name="logo-google"
                    style={{ fontSize: 40 }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 1 }} />
                <TouchableOpacity
                  transparent
                  style={styles.button}
                >
                  <Icon
                    name="ios-call"
                    style={{ fontSize: 40 }}
                  />
                </TouchableOpacity>
                <View style={{ flex: 2 }} />
              </View>
              <Text style={{ marginTop:10, fontSize: 16, textAlign: "center", color: "white" }}>{"Chưa có tài khoản"}</Text>
              <Button
                style={styles.regis}
                onPress={() => navigation.navigate("SignUp")}
              >
              <Text
                style={{ fontSize:16,color:"white"}  }>
                Đăng kí ngay
                </Text>
            </Button>
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
