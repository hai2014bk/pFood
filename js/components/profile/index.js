import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard, AsyncStorage } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import * as mConstants from '../../utils/Constants'
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import Spinner from 'react-native-loading-spinner-overlay';
import HeaderContent from "./../headerContent/";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Utils from "../../utils/validate.js"
var background = require('../../../images/background.png')
var money = require('../../../images/money.png')

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			checked: false,
			shipServices: {
				vPost: true,
				aDayroi: false,
				grab: false,
				uber: false
			},
			pay: {
				cash: true,
				bankCard: false,
				creditCard: false
			},
			firstName: '',
			lastName: '',
			address: '',
			phone: '',
			email: ''

		};

	}
	componentWillReceiveProps(props) {

	}

	async componentDidMount() {
		try {
			const value = await AsyncStorage.getItem(mConstants.USER_INFO);
			if (value !== null) {
				console.log('value',value)
				let lastName = ''
				let email = ''
			}
		} catch (error) {

		}
	}

	updateStatus(key, type) {

		let shipStatus = type === 'ship' ? Object.assign({}, this.state.shipServices) : Object.assign({}, this.state.pay);
		for (let k in shipStatus) {
			if (shipStatus.hasOwnProperty(k)) {
				shipStatus[k] = false;
				if (k === key) {
					shipStatus[k] = true;

				}
			}
		}
		if (type === 'ship') {
			this.setState({ shipServices: shipStatus });
		} else {
			this.setState({ pay: shipStatus });
		}
	}

	pickerWrap(text, key, type) {
		let shipServices = type === 'ship' ? this.state.shipServices : this.state.pay;
		let checked = shipServices[key] ? true : false;
		return (
			<View style={styles.pickerWrap}>
				<CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key, type)} />
				<Text style={styles.checkboxText}>{text}</Text>
			</View>
		)
	}
	render() {
		const navigation = this.props.navigation;
		return (
			<Container style={styles.containerWrap}>
				<Spinner visible={this.state.isLoading} />
				<HeaderContent title="Thông tin"
					leftButton={() => navigation.goBack()}
					leftIcon='ios-arrow-back'
				/>
				<Content keyboardShouldPersistTaps='handled' style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
					<View style={styles.headerTitle}>
						<Icon name="ios-contact" style={styles.userIcon} />
						<Text style={styles.infoDetail}>Thông tin chi tiết</Text>
					</View>
					<Form>
						<View style={{ flexDirection: 'row' }}>
							<Input style={styles.textInput} placeholder="Họ" placeholderTextColor='#C6C6C6' value={this.state.firstName} onChangeText={text => this.setState({ firstName: text })} />
							<Input style={styles.textInput} placeholder="Tên" placeholderTextColor='#C6C6C6' value={this.state.lastName} onChangeText={text => this.setState({ lastName: text })} />
						</View>
						<Input style={styles.textInput} placeholder="Địa chỉ hiện tại" placeholderTextColor='#C6C6C6' value={this.state.address} onChangeText={text => this.setState({ address: text })} />
						<Input style={styles.textInput} placeholder="Số điện thoại" placeholderTextColor='#C6C6C6' value={this.state.phone} onChangeText={text => this.setState({ phone: text })} />
						<Input style={styles.textInput} placeholder="Email" placeholderTextColor='#C6C6C6' value={this.state.email} onChangeText={text => this.setState({ email: text })} />
					</Form>
					<View style={styles.headerTitle}>
						<Icon name="ios-bus" style={styles.userIcon} />
						<Text style={styles.infoDetail}>Dịch vụ shipper</Text>
					</View>
					{this.pickerWrap('Viettel Post', 'vPost', 'ship')}
					{this.pickerWrap('Adayroi', 'aDayroi', 'ship')}
					{this.pickerWrap('Grab', 'grab', 'ship')}
					{this.pickerWrap('Uber', 'uber', 'ship')}
					<View style={styles.headerTitle}>
						<Image source={money} style={styles.moneyIcon} resizeMode='contain' />
						<Text style={styles.infoDetail}>Hình thức thanh toán</Text>
					</View>
					{this.pickerWrap('Tiền mặt', 'cash', 'pay')}
					{this.pickerWrap('Thẻ ngân hàng', 'bankCard', 'pay')}
					{this.pickerWrap('Thẻ tín dụng', 'creditCard', 'pay')}
					<TouchableOpacity style={styles.updateButtonWrap}>
						<Text style={styles.updateButtonText}> Cập nhật </Text>
					</TouchableOpacity>
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

const mapStateToProps = state => ({
	creatAcount: state.creatAcount
});

export default connect(mapStateToProps, bindActions)(Profile);
