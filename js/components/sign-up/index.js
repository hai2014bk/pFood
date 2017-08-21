import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Utils from "../../utils/validate.js"
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
		if (props.creatAcount.success) {
			this.setState({ isLoading: false })
			Alert.alert(
				'',
				'Tạo tài khoản thành công',
				[
					{ text: 'OK', onPress: () => this.props.navigation.goBack() },
				],
				{ cancelable: false }
			)
		} else {
			this.setState({ isLoading: false })
			Alert.alert('', 'Tạo tài khoản thất bại')
		}
	}

	showPassword() {
		this.setState({
			showPassword: !this.state.showPassword,
			checked: !this.state.checked
		})
	}

	checkSpace() {
		if (this.checkSpaceAll(this.state.email)) {
			this.setState({ email: '' })
		}
		if (this.checkSpaceAll(this.state.firstName)) {
			this.setState({ firstName: '' })
		}
		if (this.checkSpaceAll(this.state.lastName)) {
			this.setState({ lastName: '' })
		}
		if (this.checkSpaceAll(this.state.password)) {
			this.setState({ password: '' })
		}
	}

	createPassword() {
		Keyboard.dismiss()
		if (this.state.email && this.state.firstName && this.state.lastName && this.state.password) {
			if ((!this.checkSpaceAll(this.state.email)) && (!this.checkSpaceAll(this.state.firstName)) && (!this.checkSpaceAll(this.state.lastName)) && (!this.checkSpaceAll(this.state.password))) {
				if (!this.validateEmail(this.state.email) || !this.validateUnicode(this.state.email)) {
					setTimeout(() => { Alert.alert('', 'Địa chỉ email không hợp lệ') }, 200)
				} else {
					if (this.state.password.length < 8) {
						Alert.alert('', 'Mật khẩu tối thiểu 8 kí tự')
					} else {
						let params = {}
						params.firstName = this.state.firstName
						params.lastName = this.state.lastName
						params.email = this.state.email
						params.password = this.state.password
						this.props.register(params)
						this.setState({ isLoading: true })
					}
				}
			} else {
				setTimeout(() => {
					Alert.alert(
						'',
						'Một trong các trường không hợp lệ',
						[
							{ text: 'OK', onPress: () => this.checkSpace()},
						],
						{ cancelable: false }
					)
				}, 200)
			}
		} else {
			setTimeout(() => { Alert.alert('', 'Các trường không được phép trống') }, 200)
		}
	}

	render() {
		console.log('utils',Utils)
		const navigation = this.props.navigation;
		return (
			<Container style={styles.containerWrap}>
				<Spinner visible={this.state.isLoading} />
				<Image source={background} style={styles.imageBackground}>
					<Content keyboardShouldPersistTaps='handled' style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.container}>
							<Form>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.email} onChangeText={text => this.setState({ email: text })} placeholder='Địa chỉ email' placeholderTextColor='#f4e6db' />
								</Item>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.firstName} onChangeText={text => this.setState({ firstName: text })} placeholder='Tên của bạn' placeholderTextColor='#f4e6db' />
								</Item>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.lastName} onChangeText={text => this.setState({ lastName: text })} placeholder='Họ của bạn' placeholderTextColor='#f4e6db' />
								</Item>
								<Item style={styles.input} regular >
									<Input style={styles.textInput} value={this.state.password} onChangeText={text => this.setState({ password: text })} secureTextEntry={this.state.showPassword} placeholder='Mật khẩu' placeholderTextColor='#f4e6db' />
								</Item>
								<Text style={styles.passwordNote}>( Mật khẩu tối thiểu 8 kí tự )</Text>
							</Form>
							<View style={styles.checkBoxWrap}>
								<CheckBox style={styles.checkBox} onPress={() => this.showPassword()} checked={this.state.checked} />
								<Text style={styles.showPassword}>Hiện mật khẩu</Text>
							</View>
							<TouchableOpacity onPress={() => { this.createPassword() }} style={styles.button} >
								<Text style={{ color: '#f4e6db' }}>Tạo tài khoản</Text>
							</TouchableOpacity>
							<View style={styles.questionWrap}>
								<Text style={styles.questionText}>Bạn đã có tài khoản?</Text>
							</View>
							<TouchableOpacity onPress={() => { navigation.goBack(); Keyboard.dismiss() }} style={styles.button}  >
								<Text style={{ color: '#f4e6db' }}>Đăng nhập</Text>
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
function bindActions(dispatch) {
	return {
		register: (params) => dispatch(createAccount(params)),
	};
}

const mapStateToProps = state => ({
	creatAcount: state.creatAcount
});

export default connect(mapStateToProps, bindActions)(SignUp);
