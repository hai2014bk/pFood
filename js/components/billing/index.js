import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard, FlatList, AsyncStorage } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import HeaderContent from "./../headerContent/";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Utils from "../../utils/validate.js"
import * as mConstants from '../../utils/Constants';
import * as appFunction from "../../utils/function"

import Spinner from 'react-native-loading-spinner-overlay';
import { addOrder } from "../../actions/addOrder.js"
var background = require('../../../images/background.png')
var money = require('../../../images/money.png')
var food = require('../../../images/foodBasket.png')
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Drawer" })],
});

class Billing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shipKey: 'vPost',
			payKey: 'cash',
			visible: true,
			totalPrice: 0,
			data: [],
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
			addClick: true,
			userAddress: '',
			userEmail: '',
			userMobile: '',
			userName: '',

		};

	}
	async componentDidMount() {
		console.log('propsss2321', this.props);		
		totalPrice = 0
		let data = []
		this.setState({ totalPrice })
		try {
			const value = await AsyncStorage.getItem(mConstants.USER_DETAIL);
			console.log('dsfda321321213', value)
			if (value !== null) {
				var userInfo = JSON.parse(value).model
				console.log('2382190321j3212312312',userInfo)
				if(!userInfo.address) {
					userInfo.address = ''
				}
				if(!userInfo.address) {
					userInfo.mobile = ''
				}
				this.setState({
					userInfo: userInfo,
					userAddress: userInfo.address,
					userEmail: userInfo.email,
					userName: userInfo.lastName + ' ' + userInfo.firstName,
					userMobile: userInfo.mobile
				})
			}
		} catch (error) {
		}
		try {
			const value = await AsyncStorage.getItem(mConstants.CART);
			if (value !== null) {
				this.setState({ visible: false })
				data = JSON.parse(value)
				this.setState({ data })
				for (i = 0; i < data.length; i++) {
					totalPrice += data[i].price * data[i].quantity / data[i].quantityStep
					this.setState({ totalPrice })
				}
			}

		} catch (error) {
		}
	}

	componentWillReceiveProps(props) {
		let navigation = this.props.navigation
		this.setState({ visible: false })
		if (this.state.addClick === false) {
			this.setState({ addClick: true })
			if (props.addOrder.success == true) {
				console.log('thanh doan')
				Alert.alert('', 'Lưu hóa đơn thành công', [{ text: 'OK', onPress: () => { this.props.navigation.dispatch(resetAction) } }]);
				let keys = [mConstants.CART];
				AsyncStorage.multiRemove(keys)
			} else {
				Alert.alert('', props.addOrder.message, [{ text: 'OK', onPress: () => console.log('error') }]);
			}
		}
	}

	priceHandle(price) {
		var count = 0
		price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
		return price
	}

	checkValue() {
		if (this.state.userEmail == '') {
			this.userEmail._root.focus()
		}
		if (this.state.userMobile == '') {
			this.userMobile._root.focus()
		}

		if (this.state.userAddress == '') {
			this.userAddress._root.focus()
		}
		if (this.state.userName == '') {
			console.log('1213213', this.state.userName)
			this.userName._root.focus()
		}
	}
	addOrderClick() {
		var param = {};
		Keyboard.dismiss()
		data = this.state.data
		param.OrderedProducts = [];
		for (i = 0; i < data.length; i++) {
			var product = {
				ProductId: data[i].id,
				Quantity: data[i].quantity / data[i].quantityStep,
			}
			param.OrderedProducts.push(product);
		}
		if (this.state.userAddress == '' ||
			this.state.userName == '' ||
			this.state.userEmail == '' ||
			this.state.userMobile == '' ||
			Utils.checkSpaceAll(this.state.userName) ||
			Utils.checkSpaceAll(this.state.userAddress)) {
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
		} else {
			if (!Utils.validateEmail(this.state.userEmail) || !Utils.validateUnicode(this.state.userEmail)) {
				setTimeout(() => {
					Alert.alert(
						'',
						'Địa chỉ email không hợp lệ',
						[
							{ text: 'OK', onPress: () => this.userEmail._root.focus() },
						],
						{ cancelable: false }
					)
				}, 200)
			} else {
				param.UserId = this.state.userInfo.id;
				param.Status = "Submitted";
				param.TotalPrice = this.state.totalPrice;
				param.BillingAddress = this.state.userAddress;
				param.DeliveryAddress = this.state.userAddress;
				param.DeliveryMethod = this.state.shipKey;
				param.PaymentMethod = this.state.payKey;
				this.props.add(param)
				console.log(param)
				this.setState({ visible: true, addClick: false })
				this.setState({ visible: true })
			}
		}
	}

	updateStatus(key, type) {
		let shipStatus = type === 'ship' ? Object.assign({}, this.state.shipServices) : Object.assign({}, this.state.pay);
		for (let k in shipStatus) {
			if (shipStatus.hasOwnProperty(k)) {
				shipStatus[k] = false;
				if (k === key) {
					shipStatus[k] = true;
					console.log(type);
					if (type === 'ship') {
						this.setState({ shipKey: key })
					} else {
						this.setState({ payKey: key })
					}
				}
			}
		}
		if (type === 'ship') {
			this.setState({ shipServices: shipStatus });
		} else {
			this.setState({ pay: shipStatus });
		}
	}

	renderDetail() {
		return (
			<FlatList
				data={this.state.data}
				keyExtractor={item => item.id}
				renderItem={({ item }) => this.renderItem(item)}
			></FlatList>
		);
	}
	renderItem(item) {
		let proPrice = item.price * item.quantity / item.quantityStep;
		let price = this.priceHandle(proPrice.toString())
		let quantity = appFunction.handleUnitType(item.unitType,item.quantity)		
		return (
			<View style={styles.proDetail}>
				<View style={styles.flexCol}>
					<View style={styles.textProInput}>
						<Left>
							<Text style={styles.productBlackText}>{item.name}</Text>
						</Left>
						<Right>
							<Text style={styles.productText}>{price}đ</Text>
						</Right>
					</View>
					<View style={styles.textProInput}>
						<Text style={styles.shopText}>Vinmart</Text>
						<Text style={styles.proNumber}>Số lượng: {quantity} </Text>
					</View>
					<Text style={styles.shopText}>Vận chuyển : {item.shipType}</Text>
				</View>
			</View>
		)
	}

	pickerWrap(text, key, type) {
		let shipServices = type === 'ship' ? this.state.shipServices : this.state.pay;
		let checked = shipServices[key] ? true : false;
		if (key !== 'cash' && type !== 'ship') {
			return (
				<TouchableOpacity style={styles.pickerWrap}>
					<CheckBox style={styles.checkBoxDisable} color='#f2f4f4' checked={false} />
					<Text style={styles.checkboxTextDisable}>{text}</Text>
				</TouchableOpacity>
			)
		} else {
			return (
				<TouchableOpacity onPress={() => this.updateStatus(key, type)} style={styles.pickerWrap}>
					<CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key, type)} />
					<Text style={styles.checkboxText}>{text}</Text>
				</TouchableOpacity>
			)
		}
	}
	render() {
		console.log('adjf', this.state.shipKey)
		let total = this.state.totalPrice;
		let totalPrice = this.priceHandle(total.toString());
		var mdh = "F001"
		const navigation = this.props.navigation;
		var userInfo = this.state.userInfo
		console.log('paysadasdasasas', userInfo)
		if (userInfo) {
			userInfo = this.state.userInfo.model
			return (
				<Container style={styles.containerWrap}>
					<Spinner visible={this.state.visible} />
					<HeaderContent title="Hóa đơn"
						leftButton={() => navigation.goBack()}
						leftIcon='ios-arrow-back'
					/>
					<Content keyboardShouldPersistTaps='handled' style={styles.content} contentContainerStyle={{ flexGrow: 1 }}>
						<View style={styles.headerTitle}>
							<Image source={food} style={styles.moneyIcon} resizeMode='contain' />
							<Text style={styles.infoDetail}>Thông tin chi tiết</Text>
						</View>
						<View style={styles.proDetail}>
							<Text style={styles.productText}>Mã đơn Hàng: {mdh}</Text>
						</View>
						{this.renderDetail()}
						<View style={styles.totalPrice}>
							<Left>
								<Text style={styles.productBlackText}>Tổng:</Text>
							</Left>
							<Right>
								<Text style={styles.totalPriceText}>{totalPrice}đ</Text>
							</Right>
						</View>
						<View style={styles.headerTitle}>
							<Image source={money} style={styles.moneyIcon} resizeMode='contain' />
							<Text style={styles.infoDetail}>Hình thức thanh toán</Text>
						</View>
						{this.pickerWrap('Tiền mặt', 'cash', 'pay')}
						{this.pickerWrap('Thẻ ngân hàng', 'bankCard', 'pay')}
						{this.pickerWrap('Thẻ tín dụng', 'creditCard', 'pay')}
						<View style={styles.headerTitle}>
							<Icon name="ios-contact" style={styles.userIcon} />
							<Text style={styles.infoDetail}>Thông tin người đặt</Text>
						</View>
						<Input style={styles.textInput}
							ref={(name) => (this.userName = name)}
							onChangeText={(text) => { this.setState({ userName: text }) }}
							value={this.state.userName}
							placeholder="Họ và Tên"
							placeholderTextColor='#A4A4A4' />
						<Input style={styles.textInput}
							ref={(address) => (this.userAddress = address)}
							onChangeText={(text) => { this.setState({ userAddress: text }) }}
							value={this.state.userAddress}
							placeholder="Địa chỉ"
							placeholderTextColor='#A4A4A4' />
						<Input keyboardType='phone-pad' style={styles.textInput} onChangeText={(text) => { this.setState({ userMobile: text }) }}
							value={this.state.userMobile}
							maxLength={20}
							ref={(mobile) => (this.userMobile = mobile)}
							placeholder="Số điện thoại"
							placeholderTextColor='#A4A4A4' />
						<Input style={styles.textInput}
							ref={(email) => (this.userEmail = email)}
							onChangeText={(text) => { this.setState({ userEmail: text }) }}
							value={this.state.userEmail}
							placeholder="Email" placeholderTextColor='#A4A4A4' />
						<TouchableOpacity style={styles.checkoutWrap} onPress={() => { this.addOrderClick() }}>
							<Text style={styles.checkout}> Thanh toán </Text>
						</TouchableOpacity>
					</Content>
				</Container>
			);
		} else {
			return null
		}
	}

}
function bindActions(dispatch) {
	return {
		add: (params) => dispatch(addOrder(params)),
	};
}

const mapStateToProps = state => ({
	addOrder: state.addOrder,
});

export default connect(mapStateToProps, bindActions)(Billing);