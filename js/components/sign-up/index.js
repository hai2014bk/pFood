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
			lastName:'',
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

		})
	}

	checkSpace() {
		if (this.checkSpaceAll(this.state.email)) {
			this.setState({ email: '' })
			this.emailInput._root.focus()
		}
		if (this.checkSpaceAll(this.state.firstName)) {
			this.setState({ firstName: '' })
			this.firstNameInput._root.focus()
		}

	}
	checkValue() {
		if (this.state.email=='') {
			this.emailInput._root.focus()
		} else {
			if (this.state.firstName=='') {
				this.firstNameInput._root.focus()
			}
				 else {
					if (this.state.password=='') {
						this.passwordInput._root.focus()
					}
				}
			}

	}

	createPassword() {
		Keyboard.dismiss()
		if (this.state.email && this.state.firstName&& this.state.password) {
			if ((!this.checkSpaceAll(this.state.email)) && (!this.checkSpaceAll(this.state.firstName))) {
				if (!this.validateEmail(this.state.email) || !this.validateUnicode(this.state.email)) {
					setTimeout(() => {
						Alert.alert(
							'',
							'Địa chỉ email không hợp lệ',
							[
								{ text: 'OK', onPress: () => this.emailInput._root.focus() },
							],
							{ cancelable: false }
						)
					}, 200)
				} else {
					if (this.state.password.length < 8) {
						Alert.alert('', 'Mật khẩu tối thiểu 8 kí tự')
						this.passwordInput._root.focus()
					} else {
						let params = {}
						params.firstName = this.state.firstName

						params.email = this.state.email
						params.password = this.state.password
						this.props.register(params)
						this.setState({isLoading: true })
					}
				}
			} else {
				setTimeout(() => {
					Alert.alert(
						'',
						'Một trong các trường không hợp lệ',
						[
							{ text: 'OK', onPress: () => this.checkSpace() },
						],
						{ cancelable: false }
					)
				}, 200)
			}
		} else {
			setTimeout(() => {
				Alert.alert(
					'',
					'Các trường không được phép trống',
					[
						{ text: 'OK', onPress: () => this.checkValue() },
					],
					{ cancelable: false }
				)
			}, 200)
		}
	}


	render() {
		console.log('utils', Utils)
		const navigation = this.props.navigation;
		return (
			<Container style={styles.containerWrap}>
				<Spinner visible={this.state.isLoading} />
				<Image source={background} style={styles.imageBackground}>
					<Content keyboardShouldPersistTaps='handled' style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.container}>
							<Form>
									<Input main
										ref={(email) => { this.emailInput = email }}
										style={styles.textInput}
										value={this.state.email}
										 autoCapitalize = 'none'
										onChangeText={text => this.setState({ email: text })}
										placeholder='Email của bạn' placeholderTextColor='#f4e6db' />
									<Input main
										ref={(firstName) => { this.firstNameInput = firstName }}
										style={styles.textInput}
										 autoCapitalize = 'none'
										value={this.state.firstName}
										onChangeText={text => this.setState({ firstName: text })}
										placeholder='Tên của bạn' placeholderTextColor='#f4e6db' />

										<View style={styles.pass}>

									<Input
										ref={(password) => { this.passwordInput = password }}
										style={styles.textInput}
										value={this.state.password}
										onChangeText={text => this.setState({ password: text })}
										secureTextEntry={this.state.showPassword} placeholder='Mật khẩu của bạn' placeholderTextColor='#f4e6db' />
                   <TouchableOpacity  style={styles.iconp} onPress={() => this.showPassword()}>
										<Icon name="ios-eye" />
										</TouchableOpacity>
										</View>

							</Form>

							<TouchableOpacity onPress={() => { this.createPassword() }} style={styles.button} >
								<Text style={{ color: '#f4e6db',fontSize:18, }}>Đăng Ký</Text>
							</TouchableOpacity>
							<View style={styles.questionWrap}>
								<Text style={styles.questionText}>Đã có tài khoản</Text>
							</View>
							<TouchableOpacity onPress={() => { navigation.goBack(); Keyboard.dismiss() }} style={styles.button}  >
								<Text style={{ color: '#f4e6db',fontSize:18 }}>Đăng Nhập</Text>
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
