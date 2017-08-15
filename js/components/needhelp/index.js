import React, { Component } from "react";
import { Image, TouchableOpacity, StatusBar } from "react-native";
import { Container, Content, Text, Button, Icon, Item, Input, View } from "native-base";

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";

class NeedHelp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offset: {
				x: 0,
				y: 0,
			},
		};
	}

	render() {
		return (
			<Container>
				<StatusBar backgroundColor={commonColor.statusBarColor} barStyle="light-content" />
				<Content contentOffset={this.state.offset}>
					<View>
						<Image source={require("../../../images/BG-signUp.png")} style={styles.background}>
							<Content padder scrollEnabled={false}>
								<Text style={styles.signupHeader}>Forgot Your Password?</Text>
								<View style={styles.signupContainer}>
									<Item rounded style={styles.inputGrp}>
										<Icon name="mail-open" />
										<Input placeholder="Email" style={styles.input} placeholderTextColor="#FFF" />
									</Item>

									<Button
										rounded
										block
										bordered
										onPress={() => this.props.navigation.goBack()}
										style={styles.signupBtn}
									>
										<Text style={{ color: "#FFF" }}>Send Email</Text>
									</Button>

									<TouchableOpacity onPress={() => this.props.navigation.goBack()}>
										<Text style={styles.termsText}>Back To Login</Text>
									</TouchableOpacity>
								</View>
							</Content>
						</Image>
					</View>
				</Content>
			</Container>
		);
	}
}

export default NeedHelp;
