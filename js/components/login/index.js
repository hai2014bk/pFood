import React, { Component } from "react";
import { Image, Platform, StatusBar, TouchableOpacity, Alert } from "react-native";
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
  Right
} from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import { loginClick } from "../../actions/login";
const bgr = require("../../../images/background.png");
const logoF = require("../../../images/logoFamous.png");



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
    var param = {
      email: this.state.username,
      password: this.state.password
    }
    this.setState({isLoading:true})
    this.props.loginAction(param)
  }
  showAlert(title, content, button) {
  Alert.alert(title, content, button, { cancelable: false });
}
  login() {
    if (this.state.email && this.state.password) {
      if (Utils.checkSpaceAll(this.state.email)) {
        this.showAlert("Error", "Username bị bỏ trống", [
          {
            text: "OK",
            onPress: () => {
              this.email._root.focus(), this.setState({
                email: "",
                Username: ""
              });
            }
          }
        ]);
        return;
      } else {

        this.props.loginClick(this.state.email, this.state.password);
      }
    } else {
      if (!this.state.email.trim()) {
        this.showAlert("Error", "Tên người dùng không được để trống", [
          {
            text: "OK",
            onPress: () => {
              this.email._root.focus(), this.setState({
                email: "",
                Username: ""
              });
            }
          }
        ]);
        return;
      }
      if (!this.state.password.trim()) {
        this.showAlert("Error", "mật khẩu người dùng không được để trống", [
          {
            text: "OK",
            onPress: () => {
              this.password._root.focus();
            }
          }
        ]);
        return;
      }
    }

  }
  componentWillReceiveProps(props) {
    this.setState({ isLoading: false })
    if (props.login.success)
    {
      this.props.navigation.navigate('Drawer')
    }
    else {
      setTimeout(() => { alert('tài khoản hoặc mật khẩu không chính xác') }, 100)
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
        <Spinner visible={this.state.isLoading} />
<Image source={bgr} style={styles.background}>
<Content scrollEnabled={true} bounces={false}>
<Image scoure={logoF} style={ styles.logoF} />
          <View style={styles.bg}>
            <Item rounded style={styles.inputGrp}>
              <Input
              {...this.props}
          ref={ref => {
            this.email = ref;
          }}
                placeholder="Username"
                placeholderTextColor='#f4e6db'
                onChangeText={username => this.setState({ username })}
                style={styles.input}
              />
            </Item>
            <Item rounded style={styles.inputGrp}>
              <Input
              {...this.props}
          ref={ref => {
            this.email = ref;
          }}
                placeholder="Password"
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
                style={{ fontSize: 16, color: "white" }}
              >
                Login
              </Text>
            </Button>
            <TouchableOpacity
              style={{ marginTop: 10, marginBottom: 5 }}
              onPress={() => navigation.navigate(" SignUp  ")}
            >
              <Text
                style={styles.forgot}
              >
                Forgot your password
              </Text>
            </TouchableOpacity>


                   <Text style={styles.questionText}>Or Sign in with</Text>


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

            <Text style={{ fontSize: 16, textAlign: "center", color: "white" }}>{"Don't have an account"}</Text>
            <Button
                bordered
              style={styles.regis}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={
                  Platform.OS === "android"
                    ? { fontSize: 16, textAlign: "center", color: 'white' }
                    : { fontSize: 16, fontWeight: "900" }
                }
              >
                Register Now
              </Text>
            </Button>
          </View>

        </Content>
          </Image>
      </Container>
    );
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
