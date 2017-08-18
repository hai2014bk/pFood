import React, { Component } from "react";
import { Image, Platform, StatusBar, TouchableOpacity } from "react-native";
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
import { connect } from "react-redux";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import { loginClick } from "../../actions/login";
const bgr = require("../../../images/background.png");


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }
  loginClick(){
    var param = {
      email:this.state.username,
      password:this.state.password
    }
    this.props.loginAction(param)
  }
   componentWillReceiveProps(props) {

     if (props.login.success) {

   this.props.navigation.navigate('Drawer')
  }
  else{
  alert('login unsuccessful');
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
        <Content scrollEnabled={true} bounces={false}>

<Image source={bgr} style={styles.background}>

          <View style={styles.bg}>
            <Item blook style={styles.inputGrp}>
              <Input
                placeholder="Input your Username"
                onChangeText={username => this.setState({ username })}
                style={styles.input}
              />
            </Item>
            <Item block style={styles.inputGrp}>
              <Input
                placeholder="Input your password"
                secureTextEntry
                onChangeText={password => this.setState({ password })}
                style={styles.input}
              />
            </Item>
            <Button
              block
              style={styles.loginBtn}
              onPress={() => this.loginClick()}
            >
              <Text
                style={
                  Platform.OS === "android"
                    ? { fontSize: 16, textAlign: "center", color: "black" }
                    : { fontSize: 16, fontWeight: "null" }
                }
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


            <Grid style={styles.questionWrap}>
                  <Col style={[styles.col, { marginBottom: 7 }]}>
                   <Item style={styles.line} />
                  </Col>
                  <Col style={[styles.col, { flex: 2 }]}>
                   <Text style={styles.questionText}>Or Sign in with</Text>
                  </Col>
                  <Col style={[styles.col, { marginBottom: 7 }]}>
                   <Item style={styles.line} />
                  </Col>
                 </Grid>

            <View style={{ flex: 1, flexDirection: "row", height: 60 }}>
              <View style={{ flex: 2 }} />
              <Button
                bordered
                style={
                styles.button
                }
              >
                <Icon
                  name="logo-facebook"
                  style={{ fontSize: 25 }}
                />
              </Button>
              <View style={{ flex: 1 }} />
              <Button
                transparent
                style={styles.button
                }
              >
                <Icon
                  name="logo-google"
                  style={{ fontSize: 25 }}
                />
              </Button>
              <View style={{ flex: 1 }} />
              <Button
                transparent
                style={styles.button}
              >
                <Icon
                  name="ios-call"
                  style={{ fontSize: 28 }}
                />
              </Button>
              <View style={{ flex: 2 }} />
            </View>

            <Text style={{ fontSize: 16, textAlign: "center", color: "black", marginTop:30 }}>{"Don't have an account"}</Text>
            <Button
              block
              style={styles.loginBtn}
              onPress={() => navigation.navigate("SignUp")}
            >
              <Text
                style={
                  Platform.OS === "android"
                    ? { fontSize: 16, textAlign: "center",color:'black' }
                    : { fontSize: 16, fontWeight: "900" }
                }
              >
                Register Now
              </Text>
            </Button>
          </View>
        </Image>
        </Content>
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
