import React, { Component } from "react";
import { Platform, Dimensions, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Card, Button, Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { connect } from "react-redux";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
import { fetchDetail } from "../../actions/fetchDetail.js"
import * as appFunction from "../../utils/function"

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
			food: ''
		};
	}
	componentDidMount() {
		console.log('mountedssasasa', this.props.food)
		this.props.fetch(this.props.food.id)

	}
	componentWillReceiveProps(props) {
		if (props.fetchDetail.success) {
			console.log('po rop', props.fetchDetail.data.model)
			var food = props.fetchDetail.data.model
			food.quantity = 1
			this.setState({ food: food })
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
		var description=''
		if(food.description){
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
			<Grid style={{flex:1, borderColor: '#e7e9e5', borderTopWidth: 1 }}>
				<Row style={{ margin: 10, flex: 1, justifyContent: 'space-between' }}>
					<Text style={styles.contentText}>{header}</Text>
					<Text style={styles.contentText}>{content}</Text>
				</Row>
			</Grid>
		)
	}
	renderFoodContent() {
		return (
			<Card style={{padding:0, flex:1, marginBottom: 15 }}>
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
		food.quantity += 1 
		this.setState({ food:food })
	}
	minus() {
		var food = this.state.food
		if(food.quantity > 0){
			food.quantity -= 1 
			this.setState({ food:food })
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
		var quantity = food.quantity  * food.quantityStep
		var price = ''
		console.log(food.unitType)
		if (food.price) {
			price = this.priceHandle(food.price.toString())
		}
		if (quantity > 0) {
            active = 0.2,
            color = primary
        } else {
            active = 1,
            color = '#cecece'
        }
		return (
			<Grid>
				<Col style={{ margin: 10 }}>
					<Row>
					<Image source={money} style={{ height: 30, width: 30 }} resizeMode='contain' />
						<Text style={styles.price} > {price}đ</Text>
					</Row>
				</Col>
				<Col style={{ margin: 10 }}>
					<Row style={{ marginLeft: '20%', flex: 1, justifyContent: 'flex-end' }}>
					<TouchableOpacity activeOpacity={active} style={[styles.iconWrapMinus, {borderColor:color}]} onPress={() => this.minus()} >
							<Icon style={[styles.icon, {color:color}]} name="md-remove" />
						</TouchableOpacity>
						<Col style={styles.quantityContainer}>
							<Text style={styles.quantity}>{quantity} {food.unitType}</Text>
						</Col>
						<TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus()} >
							<Icon name="md-add" style={styles.icon} />
						</TouchableOpacity>
					</Row>
					<Col style={styles.buttonAddCard}>
						<Button onPress={()=> {appFunction.add(this.state.food)}} addCart large >
							<Text numberOfLines={1} style={{ width: '100%', color: 'white', fontWeight: 'normal', fontSize: 12, textAlign: 'center' }}> Thêm vào giỏ </Text>
						</Button>
					</Col>
				</Col>
			</Grid>
		)
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
					<Image resizeMode='cover' source={{ uri: imageUrl }} style={styles.foodImage} />
					{this.renderPriceAndBuy()}
					{this.renderDecription()}
					<View style={{ marginTop: 10 }}>
						{this.renderInfo()}
					</View>
					<View style={{ marginTop: 25}}>
						{this.renderFoodContent()}
					</View>
				</Content>
			</Container>
		);
	}
}

function bindActions(dispatch) {
	return {
		fetch: (id) => dispatch(fetchDetail(id)),
	};
}

const mapStateToProps = state => ({
	fetchDetail: state.fetchDetail,
});

export default connect(mapStateToProps, bindActions)(FoodDetail);
