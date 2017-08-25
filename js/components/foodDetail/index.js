import React, { Component } from "react";
import { Platform, Dimensions, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import {Card, Button, Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
const primary = require("../../themes/variable").brandPrimary;

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const testText = "\Thịt gà là món ăn được xếp vào hàng “sang chảnh” trong thế giới ẩm thực. Mặc dù có rất nhiều món ăn mới, hấp dẫn hơn nhưng trong mâm cỗ thì thịt gà là món ăn không thể thiếu. Vì không chỉ ngon miệng mà nó còn có giá trị dinh dưỡng cao, thậm chí các bài thuốc từ thịt gà cũng chữa bệnh rất tốt "
const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
class FoodDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			quantity:1,
		};
	}
	componentDidMount() {
		console.log('mounted')
		this.test()
	}
	async test() {
		var result = await AsyncStorage.getItem(mConstants.USER_INFO)
		var token = JSON.parse(result)
		console.log(token)
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
	renderDecription(){
		return(
			<Card>
			<View style={styles.cardContainer}>
				<Row style={{alignItems:'center',flex:1,borderBottomWidth:1, borderColor:'#e7e9e5'}}>
					<Text style={styles.headerText}> Mô tả </Text>
				</Row>
				<Row style={{margin:10}}>
					<Text style={styles.contentText}>{testText}</Text>
					</Row>
				</View>
				</Card>
		)
	}
	renderContentInfo(header,content){
		return(
		<Grid style={{borderColor:'#e7e9e5',borderTopWidth:1}}>
			<Row style={{margin:10,flex:1,justifyContent:'space-between'}}>
				<Text style={styles.contentText}>{header}</Text>
				<Text style={styles.contentText}>{content}</Text>
				</Row>
			</Grid>
		)
	}
	renderFoodContent(){
		return(
			<Card style={{marginBottom:15}}>
			<View style={styles.cardContainer}>
				<Row style={{alignItems:'center',flex:1,borderBottomWidth:1, borderColor:'#e7e9e5'}}>
					<Text style={styles.headerText}> Hàm Lượng </Text>
				</Row>
				{this.renderContentInfo('Diệp lục', '1000')}
				{this.renderContentInfo('Vitamin A', '10%')}
				</View>
				</Card>
		)
	}
	renderInfo(){
		return(
			<Card>
			<View style={styles.cardContainer}>
				<Row style={{alignItems:'center',flex:1,borderBottomWidth:1, borderColor:'#e7e9e5'}}>
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
	plus(){
		this.setState({quantity:this.state.quantity + 1})
	}
	minus(){
		this.setState({quantity:this.state.quantity - 1})
	}
	renderPriceAndBuy() {
		var quantity = (this.state.quantity * 200)
		var unit = 'g'
		if(quantity >= 1000){
			quantity =  quantity/1000
			unit = 'kg'
		}
		return (
			<Grid>
				<Col  style={{ margin: 10 }}>
					<Row>
						<Text style={styles.price} > 35.000đ</Text>
					</Row>
				</Col>
				<Col  style={{ margin: 10 }}>
						<Row style={{marginLeft:'20%',flex: 1, justifyContent: 'flex-end' }}>
							<TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus()} >
								<Icon name="md-add" style={styles.icon} />
							</TouchableOpacity>
							<Col style={styles.quantityContainer}>
								<Text style={styles.quantity}>{quantity} {unit}</Text>
							</Col>
							<TouchableOpacity style={styles.iconWrapMinus} onPress={() => this.minus()} >
								<Icon style={styles.icon} name="md-remove" />
							</TouchableOpacity>
						</Row>
					<Col style={styles.buttonAddCard}>
						<Button addCart large >
							<Text numberOfLines={1} style={{ width: '100%', color: 'white', fontWeight: 'normal', fontSize: 12, textAlign: 'center' }}> Thêm vào giỏ </Text>
						</Button>
					</Col>
				</Col>
			</Grid>
		)
	}

	render() {
		const navigation = this.props.navi;
		return (
			<Container style={styles.container}>
				<Content>
					<Image source={{ uri: bbq }} style={styles.foodImage} />
					{this.renderPriceAndBuy()}
					{this.renderDecription()}
					{this.renderInfo()}
					{this.renderFoodContent()}
				</Content>
				<View style={styles.pageBanner}>
					{this.pageBanner()}
				</View>
			</Container>
		);
	}
}

export default FoodDetail;
