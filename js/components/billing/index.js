import React, { Component } from "react";
import { Image, StatusBar, Alert, TouchableOpacity, ScrollView, Keyboard, FlatList, AsyncStorage } from "react-native";
import { createAccount } from "../../actions/createAccount.js"
import { connect } from "react-redux";
import { Container, Content, Text, Button, Icon, Item, Input, View, Form, CheckBox, Label, ListItem, Body, Header, Left, Right, Grid, Col } from "native-base";
import HeaderContent from "./../headerContent/";
import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";
import Utils from "../../utils/validate.js"
import * as mConstants from '../../utils/Constants';
import Spinner from 'react-native-loading-spinner-overlay';
var background = require('../../../images/background.png')
var money = require('../../../images/money.png')
var food = ''


class Billing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: true,
			totalPrice: 0,
			data:[],
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
	async componentDidMount() {
		totalPrice = 0
		let data = []
		this.setState({ totalPrice })
		try {
			const value = await AsyncStorage.getItem(mConstants.CART);
			if (value !== null) {
				this.setState({visible:false})
				data = JSON.parse(value)
				console.log('value', data)
				this.setState({ data })
				for (i = 0; i < data.length; i++) {
					totalPrice += data[i].price * data[i].quantity
					this.setState({ totalPrice })
				}
			}

		} catch (error) {
		}
	}

	componentWillReceiveProps(props) {

	}

	priceHandle(price) {
		var count = 0
		for (var i = price.length; i--; i > 0) {
			count += 1
			if (count == 4) {
				price = this.insertString(price, i + 1, '.')
				count = 0
			}
		}
		return price
	}
	insertString(str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
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

	renderDetail() {
		return (
			<FlatList
				data={this.state.data}
				keyExtractor={item => item.key}
				renderItem={({ item }) => this.renderItem(item)}
			></FlatList>
		);
	}
	renderItem(item) {
		let price = this.priceHandle(item.price.toString())
		return (
			<View style={styles.proDetail}>
				<View style={styles.textProInput}>
					<Left>
						<Text style={styles.productBlackText}>{item.description}</Text>
					</Left>
					<Right>
						<Text style={styles.productText}>{price}đ</Text>
					</Right>
				</View>
				<View style={styles.textProInput}>
					<Text style={styles.productText}>Vinmart</Text>
					<Text style={styles.proNumber}>Số lượng: {item.quantity}{item.unitType}</Text>
				</View>
				
			</View>
		)
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
		let total=this.state.totalPrice;
		let totalPrice = this.priceHandle(total.toString());
		var mdh = "F001"
		const navigation = this.props.navigation;
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
					<View style={styles.headerTitle}>
						<Icon name="ios-contact" style={styles.userIcon} />
						<Text style={styles.infoDetail}>Thông tin người đặt</Text>
					</View>
					<Input style={styles.textInput} disabled placeholder="Nguyen Van A" placeholderTextColor='#C6C6C6' />
					<Input style={styles.textInput} disabled placeholder="24T1 Hoang Dao Thuy" placeholderTextColor='#C6C6C6' />
					<Input style={styles.textInput} disabled placeholder="0123456789" placeholderTextColor='#C6C6C6' />
					<Input style={styles.textInput} disabled placeholder="Nguyen.Van.Nam@gmail.com" placeholderTextColor='#C6C6C6' />
					<Button block style={styles.button}><Text style={styles.updateButtonText} >Thanh Toán</Text></Button>
					<View style={styles.footer}></View>
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

export default connect(mapStateToProps, bindActions)(Billing);
