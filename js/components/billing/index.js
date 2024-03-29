import React, { Component } from "react";
import { Platform, Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard, FlatList, AsyncStorage } from "react-native";
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
	index: 1,
	actions: [
		NavigationActions.navigate({ routeName: 'Login' }),
		NavigationActions.navigate({ routeName: 'Drawer' })
	]
})

class Billing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			shipKey: 'vPost',
			payKey: 'cash',
			visible: true,
			totalPrice: 0,
			data: [],
			dataStores:[],
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
		var data = []
		var dataStores = []
		this.setState({ totalPrice })
		try {
			const value = await AsyncStorage.getItem(mConstants.USER_DETAIL);
			console.log('dsfda321321213', value)
			if (value !== null) {
				var userInfo = JSON.parse(value).model
				console.log('2382190321j3212312312', userInfo)
				if (!userInfo.address) {
					userInfo.address = ''
				}
				if (!userInfo.address) {
					userInfo.mobile = ''
				}
				this.setState({
					userInfo: userInfo,
					userAddress: userInfo.address,
					userEmail: userInfo.email,
					userName: userInfo.firstName,
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
				for (it in data) {
					var item = data[it]
					var seen = false
					for (st in dataStores) {
						var store = dataStores[st]
						if (item.storeProducts[0].storeId == store.id) {
							store.foods.push(item)
							seen = true
							break
						}
					}
					if (!seen) {
						var newStore = {}
						newStore.id = item.storeProducts[0].storeId
						newStore.name = item.storeProducts[0].store.name
						newStore.shipType = item.shipType
						var foods = []
						foods.push(item)
						newStore.foods = foods
						dataStores.push(newStore)
					}
				}
				console.log('dataStoreaq', dataStores[0].shipType)

				this.setState({ data,dataStores:dataStores })
				for (i = 0; i < data.length; i++) {
					totalPrice += data[i].price * data[i].quantity / data[i].quantityStep
					this.setState({ totalPrice })
				}
			}

		} catch (error) {
		}
	}

	backToDrawer() {
		console.log('939jklfdmfdgv21')
		this.props.navigation.dispatch(resetAction)
	}

	componentWillReceiveProps(props) {
		let navigation = this.props.navigation
		this.setState({ visible: false })
		if (this.state.addClick === false) {
			this.setState({ addClick: true })
			if (props.addOrder.success == true) {
				if (Platform.OS == 'ios') {
					Alert.alert('', 'Lưu hóa đơn thành công',
						[{ text: 'OK', onPress: () => this.backToDrawer() }]);
				} else {
					Alert.alert('', 'Lưu hóa đơn thành công',
						[{ text: 'OK', onPress: () => this.backToDrawer() }],
						{ cancelable: false },
					);
				}
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
		if (this.state.userEmail == '' || Utils.checkSpaceAll(this.state.userEmail)) {
			this.userEmail._root.focus()
			this.setState({ userEmail: '' })
		}
		if (this.state.userMobile == '' || Utils.checkSpaceAll(this.state.userMobile)) {
			this.userMobile._root.focus()
			this.setState({ userMobile: '' })

		}

		if (this.state.userAddress == '' || Utils.checkSpaceAll(this.state.userAddress)) {
			this.userAddress._root.focus()
			this.setState({ userAddress: '' })

		}
		if (this.state.userName == '' || Utils.checkSpaceAll(this.state.userName)) {
			this.userName._root.focus()
			this.setState({ userName: '' })
		}
		this.setState({disabled:false})
	}
	addOrderClick() {
		var param = {};
		Keyboard.dismiss()
		dataStores = this.state.dataStores
		var orderParcels = []
		for (st in dataStores){
			let store = dataStores[st]
			var parcel = {}
			var parcelProducts = []
			for (it in store.foods){
				var food =  store.foods[it]
				var item = {}
				item.productId = food.id
				item.quantity = food.quantity
				parcelProducts.push(item)
			}
			parcel = {
				status : "Submitted",
				deliveryMethod:store.shipType,
				storeId:store.id,
				parcelProducts:parcelProducts
			}
			orderParcels.push(parcel)
		}
		param.orderParcels = orderParcels
		if (this.state.userAddress == '' ||
			this.state.userName == '' ||
			this.state.userEmail == '' ||
			this.state.userMobile == '' ||
			Utils.checkSpaceAll(this.state.userName) ||
			Utils.checkSpaceAll(this.state.userAddress) ||
			Utils.checkSpaceAll(this.state.userMobile) ||
			Utils.checkSpaceAll(this.state.userEmail)) {
			setTimeout(() => {
				Alert.alert(
					'',
					'Các trường không được phép trống',
					[
						{ text: 'OK', onPress: () => this.checkValue() },
						{ onDismiss: () => {this.dismissPop()} },																			
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
							{ onDismiss: () => {this.dismissPop()} },													
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
				param.contactNumber = this.state.userMobile
				this.props.add(param)
				console.log('oi222111',param)
				this.setState({ visible: true, addClick: false })
				this.setState({ visible: true })
			}
		}
	}
	dismissPop(){
		this.setState({disabled:false})
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
				data={this.state.dataStores}
				keyExtractor={item => item.id}
				renderItem={({ item }) => this.renderStoreItems(item)}
			></FlatList>
		);
	}
	renderItem(item) {
		let proPrice = item.price * item.quantity / item.quantityStep;
		let price = this.priceHandle(proPrice.toString())
		let quantity = appFunction.handleUnitType(item.unitType, item.quantity)
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
						<Text style={styles.proNumber}>Số lượng: {quantity} </Text>
				</View>
			</View>
		)
	}

	renderStoreItems(item) {
		console.log('đáq2edasdas',item)
		return (
			<View style={styles.wrapStoreItems}>
				<Text style={styles.storeNameText}>Cửa hàng: {item.name} </Text>
				<Text style={styles.shipTypeText}>Vận chuyển: <Text style={styles.shopText}> {item.shipType} </Text> </Text>
				<FlatList
					style={{marginTop:10}}
					data={item.foods}
					keyExtractor={item => item.id}
					renderItem={({ item }) => this.renderItem(item)}
				></FlatList>
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
						<TouchableOpacity disabled={this.state.disabled} style={styles.checkoutWrap} onPress={() => {this.setState({disabled:true}), this.addOrderClick() }}>
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