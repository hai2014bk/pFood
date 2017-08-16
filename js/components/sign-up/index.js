import React, { Component } from "react";
import { Image, StatusBar, Alert } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import HeaderContent from "./../headerContent/";

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
			firstName: '',
			lastName: '',
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

	createPassword() {
		if (this.state.email && this.state.firstName && this.state.lastName && this.state.password) {
			let params = {}
			params.firstName = this.state.firstName
			params.lastName = this.state.lastName
			params.email = this.state.email
			params.password = this.state.password
			this.props.register(params)
		} else {
			Alert.alert('', 'Fields are not be blank')
		}
	}

	render() {
		const navigation = this.props.navigation;
		return (
			<Container style={styles.containerWrap}>
				<HeaderContent leftButton={()=>navigation.goBack()} leftIcon="ios-arrow-back" title='Register'/>
				<Content style={styles.container}>
					<Form>
						<Item inlineLabel >
							<Input value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder='Input your email' />
						</Item>
						<Item inlineLabel >
							<Input value={this.state.firstName} onChangeText={text => this.setState({ firstName: text })} placeholder='Input your first name' />
						</Item>
						<Item inlineLabel >
							<Input value={this.state.lastName} onChangeText={text => this.setState({ lastName: text })} placeholder='Input your last name' />
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
function bindActions(dispatch) {
	return {
		register: (params) => dispatch(createAccount(params)),
	};
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, bindActions)(SignUp);
