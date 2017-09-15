import React, { Component } from "react";
import { InteractionManager, Platform, Dimensions, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Card, Button, Icon, List, ListItem, Header, Container, Content, Thumbnail, CheckBox } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { connect } from "react-redux";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
import { reRenderHeader } from '../../actions/header'
import { fetchDetail } from "../../actions/fetchDetail.js"
import * as appFunction from "../../utils/function"
import Spinner from 'react-native-loading-spinner-overlay';
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';

const primary = require("../../themes/variable").brandPrimary;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const testText = "\Thịt gà là món ăn được xếp vào hàng “sang chảnh” trong thế giới ẩm thực. Mặc dù có rất nhiều món ăn mới, hấp dẫn hơn nhưng trong mâm cỗ thì thịt gà là món ăn không thể thiếu. Vì không chỉ ngon miệng mà nó còn có giá trị dinh dưỡng cao, thậm chí các bài thuốc từ thịt gà cũng chữa bệnh rất tốt "
const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
const money = require("../../../images/money.png");

class FoodDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			quantity: 1,
			seeMore: false,
			food: '',
			isLoading: true,
			shipTypes: {
				ViettelPost: true,
				Adayroi: false,
				Grab: false,
				Uber: false
			},
			loaded: false,
			item: {},
			ship: 'ViettelPost',
			disabled: false,
		};
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.fetch(this.props.food.id)
		})

	}
	componentWillReceiveProps(props) {
		this.setState({ isLoading: false })
		if (props.fetchDetail.success) {
			if (!this.state.loaded) {
				var food = props.fetchDetail.data.model
				if (food.id == this.props.food.id) {
					food.quantity = food.quantityStep * food.minOrderedItems
					let metaData = food.productMetaData
					for (j in metaData) {
						console.log('mcncvs', metaData)
						if (metaData[j].name == 'Discount') {
							let discountPrice = food.price * metaData[j].value / 100
							food.price = food.price - discountPrice
						}
					}
					this.setState({ food: food, loaded: true })
				}
			}
		}
		if (!props.fetchDetail.success) {
			setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
		}
	}
	pageBanner() {
		return (
			<Swiper activeDotColor={primary} autoplay={true}>
				<View style={{ flex: 1 }}>
					<Image resizeMode='stretch'
						style={{ flex: 1 }}
						source={{ uri: steak }}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Image resizeMode='stretch'
						style={{ flex: 1 }}
						source={{ uri: pizza }}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Image resizeMode='stretch'
						style={{ flex: 1 }}
						source={{ uri: bbq }}
					/>
				</View>
			</Swiper>
		)
	}

	renderDiscount(data) {
		console.log('2133213fbfvvbf', data)
		if (data) {
			if (data.productMetaData[1]) {
				var discount = ''
				for (i in data.productMetaData) {
					if (data.productMetaData[i].name == 'Discount') {
						if (data.productMetaData[i].value) {
							discount = data.productMetaData[i].value
						}
					}
				}
				if (discount == '') {
					return null
				}
				return (
					<View style={styles.saleView}>
						<Text style={styles.saleText}>-{discount} %</Text>
					</View>
				)
			} else {
				return null
			}
		} else {
			return null
		}
	}
	renderStar(rate) {
		return (
			<StarRating
				emptyStar={'ios-star-outline'}
				fullStar={'ios-star'}
				halfStar={'ios-star-half'}
				iconSet={'Ionicons'}
				disabled={true}
				maxStars={5}
				rating={rate}
				starColor={primary}
				selectedStar={(rating) => this.onStarRatingPress(rating)}
				starSize={8}
			/>
		)
	}
	renderDescriptionContent() {
		if (this.state.seeMore) {

		}
	}
	renderDecription() {
		var food = this.state.food
		var description = ''
		if (food.description) {
			description = food.description
		}
		return (
			<Card>
				<View style={styles.cardContainer}>
					<Row style={{ alignItems: 'center', flex: 1, borderBottomWidth: 1, borderColor: '#e7e9e5' }}>
						<Text style={styles.headerText}> Mô tả </Text>
					</Row>
					<Row style={{ margin: 10 }}>
						<Text style={styles.contentText}>{description}</Text>
					</Row>
				</View>
			</Card>
		)
	}
	renderContentInfo(header, content) {
		return (
			<Grid style={{ flex: 1, borderColor: '#e7e9e5', borderTopWidth: 1 }}>
				<Row style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}>
					<Text style={styles.contentText}>{header}</Text>
					<Text style={styles.contentText}>{content}</Text>
				</Row>
			</Grid>
		)
	}
	renderFoodContent() {
		return (
			<Card style={{ padding: 0, flex: 1, marginBottom: 15 }}>
				<View style={styles.cardContainer}>
					<Text style={styles.headerText}> Hàm Lượng </Text>
					{this.renderContentInfo('Diệp lục', '1000')}
					{this.renderContentInfo('Vitamin A', '10%')}
				</View>
			</Card>
		)
	}
	renderInfo() {
		return (
			<Card>
				<View style={styles.cardContainer}>
					<Row style={{ alignItems: 'center', flex: 1, borderBottomWidth: 1, borderColor: '#e7e9e5' }}>
						<Text style={styles.headerText}> Thông Tin Sản Phẩm </Text>
					</Row>
					{this.renderContentInfo('Store', 'Vinmart')}
					{this.renderContentInfo('Khu vực', 'Hà Nội')}
					{this.renderContentInfo('Danh Mục', 'Thực phẩm sạch')}
					{this.renderContentInfo('Số lượng tối thiểu', '500g')}
					{this.renderContentInfo('Thời gian ship', '1 - 2 giờ')}
				</View>
			</Card>
		)
	}
	plus() {
		var food = this.state.food
		food.quantity += food.quantityStep
		this.setState({ food: food })
	}
	minus() {
		var food = this.state.food
		if (food.quantity > 0) {
			food.quantity -= food.quantityStep
			this.setState({ food: food })
		}
	}
	priceHandle(price) {
		var count = 0
		price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
		return price
	}
	insertString(str, index, value) {
		return str.substr(0, index) + value + str.substr(index);
	}
	renderPriceAndBuy() {
		var food = this.state.food
		console.log('step', food)
		var quantity = ''
		var price = ''
		var disabled = false
		console.log(food.unitType)
		if (food.price) {
			price = this.priceHandle(food.price.toString())
			quantity = appFunction.handleUnitType(food.unitType, food.quantity)
		}
		if (food.quantity >= food.quantityStep * food.minOrderedItems) {
			if (food.quantity == food.quantityStep * food.minOrderedItems) {
				disabled = true
				color = '#cecece'
				active = 1
			} else {
				disabled = false
				active = 0.2
				color = primary
			}

			buttonAdd = (
				<Button disabled={this.state.disabled} addCart onPress={() => { this.addtoCart(food); this.setState({ item: food }) }} >
					<Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
				</Button>
			)
		} else {
			active = 1,
				color = '#cecece'
			var disabled = true
			buttonAdd = (
				<Button disabled={true} style={{ backgroundColor: '#cecece' }} addCart >
					<Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
				</Button>
			)
		}
		return (
			<Grid>
				<Col style={{ margin: 10 }}>
					<Row>
						<Image source={money} style={{ height: 30, width: 30 }} resizeMode='contain'>
						</Image>
						<Text style={styles.price} > {price}đ</Text>
					</Row>
				</Col>
				<Col style={{ margin: 10 }}>
					<Row style={{ marginLeft: '20%', flex: 1, justifyContent: 'flex-end' }}>
						<TouchableOpacity disabled={disabled} activeOpacity={active} style={[styles.iconWrapMinus, { borderColor: color }]} onPress={() => this.minus()} >
							<Icon style={[styles.icon, { color: color }]} name="md-remove" />
						</TouchableOpacity>
						<Col style={styles.quantityContainer}>
							<Text style={styles.quantity}>{quantity} </Text>
						</Col>
						<TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus()} >
							<Icon name="md-add" style={styles.icon} />
						</TouchableOpacity>
					</Row>
					<Col style={styles.buttonAddCard}>
						{buttonAdd}
					</Col>
				</Col>
			</Grid>
		)
	}

	async addtoCart(item) {
		let data = []
		this.setState({ disabled: true })
		setTimeout(() => { this.setState({ disabled: false }) }, 500)
		try {
			const value = await AsyncStorage.getItem(mConstants.CART);
			if (value !== null) {
				data = JSON.parse(value)
				if (data.length > 0) {
					for (let i = 0; i <= data.length; i++) {
						console.log(data[i].purveyorId)
						if (item.purveyorId == null) {
							item.purveyorId = 0
							item.shipType = data[i].shipType
							appFunction.add(item, this.props)
						} else {
							if (data[i].purveyorId == item.purveyorId) {
								item.shipType = data[i].shipType
								appFunction.add(item, this.props)
							} else {
								this.popupDialog.show()
							}
						}
					}
				} else {
					this.popupDialog.show()
				}
			} else {
				this.popupDialog.show()
			}
		} catch (error) {
		}
	}

	updateStatus(key) {
		let boxType = Object.assign({}, this.state.shipTypes)
		for (let k in boxType) {
			if (boxType.hasOwnProperty(k)) {
				boxType[k] = false;
				if (k === key) {
					boxType[k] = true;
				}
			}
		}
		this.setState({ shipTypes: boxType, ship: key });
	}

	pickerWrap(text, key) {
		let shipTypes = this.state.shipTypes
		let checked = shipTypes[key] ? true : false;
		return (
			<TouchableOpacity style={styles.pickerWrap} onPress={() => this.updateStatus(key)}>
				<CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key)} />
				<Text style={styles.checkboxText}>{text}</Text>
			</TouchableOpacity>
		)
	}
	renderPopup() {
		return (
			<PopupDialog
				dialogTitle={<DialogTitle title="Hình thức vận chuyển" />}
				ref={(popupDialog) => { this.popupDialog = popupDialog; }}
				dialogStyle={{ marginTop: -200 }}
				width={250}
				height={250}
				actions={[
					<DialogButton
						text="Xác nhận" t
						onPress={() => {
							this.addCart()
						}}
						key="button-1"
					/>,
				]}
			>
				<View style={styles.pickerContainer}>
					{this.pickerWrap('Viettel Post', 'ViettelPost')}
					{this.pickerWrap('Adayroi', 'Adayroi')}
					{this.pickerWrap('Grab', 'Grab')}
					{this.pickerWrap('Uber', 'Uber')}
				</View>
			</PopupDialog>
		)
	}

	addCart() {
		let item = this.state.item
		if (item.purveyorId == null) {
			item.purveyorId = 0
		}
		item.shipType = this.state.ship
		appFunction.add(item, this.props)
		this.popupDialog.dismiss()
	}

	render() {
		var imageUrl = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png'
		if (this.state.food.productMetaData) {
			imageUrl = this.state.food.productMetaData[0].value
		}
		const navigation = this.props.navi;
		return (
			<Container style={styles.container}>
				<Content>
					<Spinner visible={this.state.isLoading} />
					<Image resizeMode='cover' source={{ uri: imageUrl }} style={styles.foodImage}>
						{this.renderDiscount(this.state.food)}
					</Image>
					{this.renderPriceAndBuy()}
					{this.renderDecription()}
					<View style={{ marginTop: 10 }}>
						{this.renderInfo()}
					</View>
					<View style={{ marginTop: 25 }}>
						{this.renderFoodContent()}
					</View>

				</Content>
				{this.renderPopup()}
			</Container>
		);
	}
}

function bindActions(dispatch) {
	return {
		fetch: (id) => dispatch(fetchDetail(id)),
		reRenderHeader: () => dispatch(reRenderHeader())
	};
}

const mapStateToProps = state => ({
	fetchDetail: state.fetchDetail,
});

export default connect(mapStateToProps, bindActions)(FoodDetail);
