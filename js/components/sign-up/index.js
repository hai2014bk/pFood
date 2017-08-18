import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
var background = require('../../../images/background.png')

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
			isLoading: false
		};
		this.validateEmail = this.validateEmail.bind(this)
	}

	componentWillReceiveProps(props) {
		if (props.createAccountSuccess) {
			this.setState({ isLoading: false })
			Alert.alert(
				'',
				'Create account successfully',
				[
					{ text: 'OK', onPress: () => this.props.navigation.goBack() },
				],
				{ cancelable: false }
			)
		}
		if (props.createAccountFailed) {
			Alert.alert('', 'Create account failed')
		}
	}

	showPassword() {
		this.setState({
			showPassword: !this.state.showPassword,
			checked: !this.state.checked
		})
	}

	createPassword() {
		Keyboard.dismiss()
		if (this.state.email && this.state.firstName && this.state.lastName && this.state.password) {
			if (!this.validateEmail(this.state.email)) {
				Alert.alert('', 'Email is not a valid type')
			} else {
				let params = {}
				params.firstName = this.state.firstName
				params.lastName = this.state.lastName
				params.email = this.state.email
				params.password = this.state.password
				this.props.register(params)
				this.setState({ isLoading: true })
			}
		} else {
			Alert.alert('', 'Fields are not be blank')
		}
	}

	render() {
		const navigation = this.props.navigation;
		return (
			<Container style={styles.containerWrap}>
				<Spinner visible={this.state.isLoading} />
				<Image source={background} style={styles.imageBackground}>
					<Content keyboardShouldPersistTaps='handled' style={{flex:1}}>
						<View style={styles.container}>
							<Form>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder='Input your email' placeholderTextColor='#f4e6db' />
								</Item>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.firstName} onChangeText={text => this.setState({ firstName: text })} placeholder='Input your first name' placeholderTextColor='#f4e6db' />
								</Item>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.lastName} onChangeText={text => this.setState({ lastName: text })} placeholder='Input your last name' placeholderTextColor='#f4e6db' />
								</Item>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.password} onChangeText={text => this.setState({ password: text })} secureTextEntry={this.state.showPassword} placeholder='Input your password' placeholderTextColor='#f4e6db' />
								</Item>
							</Form>
							<View style={styles.checkBoxWrap}>
								<CheckBox style={styles.checkBox} onPress={() => this.showPassword()} checked={this.state.checked} />
								<Text style={styles.showPassword}>Show password</Text>
							</View>
							<TouchableOpacity onPress={() => this.createPassword()} style={styles.button} >
								<Text style={{ color: '#f4e6db' }}>Create your account</Text>
							</TouchableOpacity>
							<View style={styles.questionWrap}>
								<Text style={styles.questionText}>Already have an account</Text>
							</View>
							<TouchableOpacity onPress={() => { navigation.goBack(); Keyboard.dismiss() }} style={styles.button}  >
								<Text style={{ color: '#f4e6db' }}>Sign in now</Text>
							</TouchableOpacity>
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
function bindActions(dispatch) {
	return {
		register: (params) => dispatch(createAccount(params)),
	};
}

const mapStateToProps = state => ({
	createAccountSuccess: state.createAccountSuccess,
	createAccountFailed: state.createAccountFailed
});

export default connect(mapStateToProps, bindActions)(SignUp);
