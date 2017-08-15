import React, { Component } from "react";
import { Image, Platform, StatusBar } from "react-native";
import { Container, Content, Text, Item, Input, Button, Icon, View, Left, Right } from "native-base";

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";

const bg = require("../../../images/BG.png");
const logo = require("../../../images/logo.png");

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
	}

	render() {
		const navigation = this.props.navigation;
		return (
			<Container>
				<StatusBar backgroundColor={commonColor.statusBarColor} barStyle="light-content" />
				<Content scrollEnabled={true} bounces={false}>
					<Image source={bg} style={styles.background}>
						<Image source={logo} style={Platform.OS === "android" ? styles.aShadow : styles.iosShadow} />

						<View style={styles.bg}>
							<Item rounded style={styles.inputGrp}>
								<Icon name="person" />
								<Input
									placeholder="Username"
									onChangeText={username => this.setState({ username })}
									placeholderTextColor="#FFF"
									style={styles.input}
								/>
							</Item>

							<Item rounded style={styles.inputGrp}>
								<Icon name="unlock" />
								<Input
									placeholder="Password"
									secureTextEntry
									placeholderTextColor="#FFF"
									onChangeText={password => this.setState({ password })}
									style={styles.input}
								/>
							</Item>

							<Button
								rounded
								primary
								block
								large
								style={styles.loginBtn}
								onPress={() => navigation.navigate("Walkthrough")}
							>
								<Text
									style={
										Platform.OS === "android"
											? { fontSize: 16, textAlign: "center", top: -5 }
											: { fontSize: 16, fontWeight: "900" }
									}
								>
									Get Started
								</Text>
							</Button>

							<View style={styles.otherLinksContainer}>
								<Left>
									<Button
										transparent
										style={{ alignSelf: "flex-start" }}
										onPress={() => navigation.navigate("SignUp")}
									>
										<Text style={styles.helpBtns}>Create Account</Text>
									</Button>
								</Left>
								<Right>
									<Button
										transparent
										style={{ alignSelf: "flex-end" }}
										onPress={() => navigation.navigate("NeedHelp")}
									>
										<Text style={styles.helpBtns}>Need Help?</Text>
									</Button>
								</Right>
							</View>
						</View>
					</Image>
				</Content>
			</Container>
		);
	}
}

export default Login;
