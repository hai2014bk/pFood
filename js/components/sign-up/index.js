import React, { Component } from "react";
import { Image, StatusBar, Alert } from "react-native";

import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offset: {
				x: 0,
				y: 0,
			},
			showPassword: true,
			checked: false,
			email: '',
			name: '',
			password: '',
		};
	}

	showPassword() {
		this.setState({
			showPassword: !this.state.showPassword,
			checked: !this.state.checked
		})
	}

	createPassword(){
		if(this.state.email && this.state.name && this.state.password){

		}else{
			Alert.alert('','Fields are not be blank')
		}
	}

	render() {
		const navigation = this.props.navigation;
		return (
			<Container style={styles.containerWrap}>
				<StatusBar backgroundColor={commonColor.statusBarColor} barStyle="light-content" />
				<Content style={styles.container}>
					<Form>
						<Item inlineLabel >
							<Input value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder='Input your email' />
						</Item>
						<Item inlineLabel >
							<Input value={this.state.name} onChangeText={text => this.setState({ name: text })} placeholder='Input your name' />
						</Item>
						<Item inlineLabel >
							<Input value={this.state.password} onChangeText={text => this.setState({ password: text })} secureTextEntry={this.state.showPassword} placeholder='Input your password' />
						</Item>
					</Form>
					<Grid style={styles.checkBoxWrap}>
						<CheckBox onPress={() => this.showPassword()} checked={this.state.checked} />
						<Text style={styles.showPassword}>Show password</Text>
					</Grid>
					<Button onPress={() => this.createPassword()} style={styles.button} block info>
						<Text>Create your password</Text>
					</Button>
					<Grid style={styles.questionWrap}>
						<Col style={[styles.col, { marginBottom: 5 }]}>
							<Item style={styles.line} />
						</Col>
						<Col style={[styles.col, { flex: 2 }]}>
							<Text style={styles.questionText}>Already have an account</Text>
						</Col>
						<Col style={[styles.col, { marginBottom: 5 }]}>
							<Item style={styles.line} />
						</Col>
					</Grid>
					<Button onPress={() => navigation.navigate("Login")} style={styles.button} block info>
						<Text>Sign in now</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}

export default SignUp;
