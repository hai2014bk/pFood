import React, { Component } from "react";
import {InteractionManager, FlatList, Platform, Dimensions, AsyncStorage, Text, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Card, Button, Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { connect } from "react-redux";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from "./styles";
import { fetchStoreProduct } from "../../actions/fetchStoresDetail.js"
import * as appFunction from "../../utils/function"
const primary = require("../../themes/variable").brandPrimary;
const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const testText = "\Thịt gà là món ăn được xếp vào hàng “sang chảnh” trong thế giới ẩm thực. Mặc dù có rất nhiều món ăn mới, hấp dẫn hơn nhưng trong mâm cỗ thì thịt gà là món ăn không thể thiếu. Vì không chỉ ngon miệng mà nó còn có giá trị dinh dưỡng cao, thậm chí các bài thuốc từ thịt gà cũng chữa bệnh rất tốt "
const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://media.bizwebmedia.net/Sites/99161/data/upload/2016/t2/than_bo_uc_1.jpg?20'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
const money = require("../../../images/money.png");
import Image from 'react-native-image-progress';

class StoreProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			isLoading: true,
			disabled: false
		};
	}
	componentDidMount() {
		InteractionManager.runAfterInteractions(() => {
			this.props.fetch(this.props.storeParrent.id)			
		})
	}
	componentWillReceiveProps(props) {
		this.setState({isLoading:false})
		if (props.fetchStoreProduct.success) {
			var food = []
			for (i in props.fetchStoreProduct.data.model){
				var item = props.fetchStoreProduct.data.model[i]
				if (item.status != 'Deleted'){
					food.push(item)
				}
			}
			this.setState({ data: food })
		}
		if (!props.fetchStoreProduct.success) {
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
				starSize={10}
			/>
		)
	}
	_keyExtractor = (item, index) => item.id;
	openDetail(food) {
		this.setState({disabled:true})
		this.props.screenProps.navi.navigate('FoodTab', { parrent: food })
		InteractionManager.runAfterInteractions(() => {
			this.setState({ disabled: false })
		})

	}
 renderDiscount(data) {
		if (data.productMetaData[1]) {
			var discount = ''
			for (i in data.productMetaData) {
				if(data.productMetaData[i].name == 'Discount') {
					if(data.productMetaData[i].value) {
						discount = data.productMetaData[i].value
					}				
				}
			}
			if(discount == '') {
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
	}
	renderOldPrice(data) {
		if (data.productMetaData[1]) {
			for (i in data.productMetaData) {
				if(data.productMetaData[i].name == 'Discount') {
					var oldPrice = this.priceHandle(data.price)					
				}
			}
			return (
				<View>
					<Text style={styles.oldPriceText}>{oldPrice}</Text>
				</View>
			)
		} else {
			return (
				<View>
					<Text style={[styles.oldPriceText,{color:'white'}]}>22132132</Text>
				</View>
			)
		}
	}
	
	priceHandle(price) {
		var count = 0
		price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
		return price
	}
	renderCell(data) {
		var food = data.item
		var imageUrl = 'http://runawayapricot.com/wp-content/uploads/2014/09/placeholder.jpg'
		for (i in food.productMetaData) {
			if(food.productMetaData[i].name == 'ImageUrl') {
				if (food.productMetaData[i]) {
					imageUrl = food.productMetaData[i].value
				}					
			}
		}
		
		var price = this.priceHandle(food.price)
		for (i in food.productMetaData) {
			if(food.productMetaData[i].name == 'Discount') {
				var discountPrice = food.price * (food.productMetaData[i].value/100)
				price = this.priceHandle(food.price - discountPrice)				
			}
		}
		return (
			<View>
				<TouchableOpacity disabled={this.state.disabled} onPress={() => { this.openDetail(food) }} style={{ flex: 1, alignItems: 'center' }} >
					<Grid style={styles.cellContainer}>
						<Row style={styles.upContainer}>
							<Image resizeMode='cover' style={styles.foodThumnail} source={{ uri: imageUrl }} >
								{this.renderDiscount(food)}
							</Image>
						</Row>
						<Row style={styles.downContainer}>
							<Text numberOfLines={2} style={styles.foodNameText}>{food.name}</Text>
							<View style={{ paddingLeft: 2, flex: 1, width: '100%' }}>
								<Row style={{ justifyContent: 'space-between', marginTop: 3 }} >
									<Row style={{ alignSelf: 'flex-end' }} >
										<Icon name='ios-pin' style={styles.locationIcon} />
										<Text style={styles.shopNameText}>{this.props.storeParrent.name}</Text>
									</Row>
									{this.renderOldPrice(food)}
								</Row>
								<Row style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }} size={1}>
									<Text style={styles.priceText}>{price} đ</Text>
									<View style={{
										marginRight: 2, marginRight: 5
									}}>
										{this.renderStar(food.avgRate)}
									</View>
								</Row>
							</View>
						</Row>
					</Grid>
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		var imageUrl = 'https://education.microsoft.com/Assets/images/workspace/placeholder-camera-760x370.png'
		if (this.props.storeParrent.storeImageUrl) {
			imageUrl = this.props.storeParrent.storeImageUrl
		}
		const navigation = this.props.navi;
		return (
			<Container style={styles.container}>
				<Spinner visible={this.state.isLoading} />
				<Content style={{ flex: 1 }}>
					<View style={{ flexDirection: 'row' }}>
						<Image resizeMode='contain' source={{ uri: imageUrl }} style={styles.foodImage} />
					</View>
					<View style={{ marginLeft: 10, flexDirection: 'row' }}>
						<Image source={money} style={{ height: 30, width: 30 }} resizeMode='contain' />
						<Text style={styles.sectionText} >Danh sách sản phẩm</Text>
					</View>
					<FlatList
						showsVerticalScrollIndicator={false}
						style={{ marginTop: 5, marginLeft: 10, marginRight: 10 }}
						data={this.state.data}
						extraData={this.state.data}
						keyExtractor={this._keyExtractor}
						numColumns={2}
						renderItem={(item) => (
							<View style={styles.listItem} >
								{this.renderCell(item)}
							</View>
						)
						}
					/>
				</Content>
			</Container>
		);
	}
}

function bindActions(dispatch) {
	return {
		fetch: (id) => dispatch(fetchStoreProduct(id)),
	};
}

const mapStateToProps = state => ({
	fetchStoreProduct: state.fetchStoreProduct,
});

export default connect(mapStateToProps, bindActions)(StoreProduct);
