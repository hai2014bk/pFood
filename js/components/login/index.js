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

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";

const bg = require("../../../images/BG.png");
const logo = require("../../../images/logo.png");

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
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
				<View style={{marginTop:5,justifyContent:'center',alignItems:'center',resizeMode:'contain',flex:1}}>
				<Image source={logo} style={{height:100,resizeMode:'contain',}}  />
				</View>
          <View style={styles.bg}>
            <Item blook style={styles.inputGrp}>
              <Input
                placeholder="Input your Username"
                onChangeText={username => this.setState({ username })}
                placeholderTextColor="#100000"
                style={styles.input}
              />
            </Item>
            <Item block style={styles.inputGrp}>
              <Input
                placeholder="Input your password"
                secureTextEntry
                placeholderTextColor="black"
                onChangeText={password => this.setState({ password })}
                style={styles.input}
              />
            </Item>
            <Button
              block
              style={styles.loginBtn}
              onPress={() => navigation.navigate("Walkthrough")}
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
                style={{
                  fontSize: 16,
                  color: "black",
                  textAlign: "center",
                  textDecorationLine: "underline",
                  color: "blue"
                }}
              >
                Forgot your password
              </Text>
            </TouchableOpacity>
            <Text style={{ color: "black" ,marginTop:15,marginBottom:10}}>
              --------------Or Sign in with ----------------
            </Text>
            <View style={{ flex: 1, flexDirection: "row", height: 60 }}>
              <View style={{ flex: 2 }} />
              <Button
                bordered
                style={{
                  flex: 2,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 60
                }}
              >
                <Icon
                  name="logo-facebook"
                  style={{ fontSize: 25, resizeMode: "contain" }}
                />
              </Button>
              <View style={{ flex: 1 }} />
              <Button
                transparent
                style={{
                  flex: 2,
                  borderWidth: 1,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 60
                }}
              >
                <Icon
                  name="logo-google"
                  style={{ fontSize: 25, resizeMode: "contain" }}
                />
              </Button>
              <View style={{ flex: 1 }} />
              <Button
                transparent
                style={{
                  flex: 2,
                  borderWidth: 1,
                  borderRadius: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  height: 60
                }}
              >
                <Icon
                  name="ios-call"
                  style={{ fontSize: 28, resizeMode: "contain" }}
                />
              </Button>
              <View style={{ flex: 2 }} />
            </View>

            <Text style={{ fontSize: 16, textAlign: "center", color: "black" }}>
              "Don't" have an account
            </Text>
            <Button
              block
              style={styles.loginBtn}
              onPress={() => navigation.navigate("   SignUp    ")}
            >
              <Text
                style={
                  Platform.OS === "android"
                    ? { fontSize: 16, textAlign: "center" }
                    : { fontSize: 16, fontWeight: "900" }
                }
              >
                Register Now
              </Text>
            </Button>
          </View>

        </Content>
      </Container>
    );
  }
}

export default Login;
