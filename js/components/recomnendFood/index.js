import React, { Component } from "react";
import { ActivityIndicator, Dimensions, Alert, FlatList, InteractionManager, AsyncStorage, Text, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import FadeIn from 'react-native-fade-in-image';
import HeaderContent from "./../headerContent/";
import Image from 'react-native-image-progress';

import {
	LazyloadScrollView,
	LazyloadView,
	LazyloadImage
} from 'react-native-lazyload';
import { fetchBanner, fetchTrendingRecomend } from "../../actions/fetchTrendingRecomend.js"
import Swiper from 'react-native-swiper';
import styles from "./styles";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import Carousel from 'react-native-banner-carousel';

const BannerWidth = Dimensions.get('window').width;
const primary = require("../../themes/variable").brandPrimary;


const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'


class RecommendFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false,
			dataSection: [],
			isLoading: false,
			tredingLoaded: false,
			lastestLoaded: false,
			lowestLoaded: false,
			bannerLoaded: false,
			banners: []

		};
	}
	async componentDidMount() {
		var date = new Date()
		let isoDate = date.toISOString().slice(0, -1)
		// console.log('2321321', isoDate)
		var isVisible = this.props
		console.log('kldasd va',isVisible)
		var params = {
			"PageSize": "20",
			"PageIndex": "1",
			"LastViewedDate": "2017-08-20T15:20:34.8699498"
		}
		this.props.fetchTrending(params)
		this.props.fetchBanner()
	}

	componentWillReceiveProps(props) {
		if (props.fetchBannerRecomend.success && !this.state.bannerLoaded) {
			console.log('dskjfdaklsf',props.fetchBannerRecomend)
			if (props.fetchBannerRecomend.data.model[0]) {
				console.log('dskjfdakls22221')
				var listBanner = props.fetchBannerRecomend.data.model
				this.setState({ banners: listBanner, bannerLoaded: true })
			}
		}
		if (props.fetchTrendingRecomend.success && !this.state.tredingLoaded) {
			if (props.fetchTrendingRecomend.data.model[0]) {
				var listFood = props.fetchTrendingRecomend.data.model
				var trendingFood = {}
				trendingFood.sectionName = 'Được xem nhiều nhất'
				trendingFood.food = listFood
				var dataSection = this.state.dataSection
				dataSection.push(trendingFood)
				this.setState({ dataSection: dataSection, tredingLoaded: true })
			}
		}
		if (props.fetchLastestRecomend.success && !this.state.lastestLoaded) {
			console.log('djals12ádas')
			if (props.fetchLastestRecomend.data.model[0]) {
				var listFood = props.fetchLastestRecomend.data.model
				for (i in listFood) {
					listFood[i].quantity = 0
				}
				var lastestFood = {}
				lastestFood.sectionName = 'Gần đây nhất'
				lastestFood.food = listFood
				var dataSection = this.state.dataSection
				dataSection.push(lastestFood)
				this.setState({ dataSection: dataSection, lastestLoaded: true })
			}
		}
		if (props.fetchLowestRecomend.success && !this.state.lowestLoaded) {
			if (props.fetchLowestRecomend.data.model[0]) {
				var listFood = props.fetchLowestRecomend.data.model
				for (i in listFood) {
					listFood[i].quantity = 0
				}
				var lowestFood = {}
				lowestFood.sectionName = 'Giá thấp nhất'
				lowestFood.food = listFood
				var dataSection = this.state.dataSection
				dataSection.push(lowestFood)
				this.setState({ dataSection: dataSection, lowestLoaded: true })
			}
		}
		if (!props.fetchTrendingRecomend.success) {
			// console.log('9328934893141', props)
			if(!this.state.failed) {
				setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
				this.setState({failed:true})
			}
		}
	}

	renderPage(item, index) {
		return (
			<View style={{ flex: 1 }} key={index} style={styles.slide1}>
				<Image style={styles.imageBanner} source={{ uri: item.imageUrl }} />
			</View>
		)
	}

	pageBanner() {
		var banners = []
		var sliders = []
		var imageLoad = 'http://www.jqueryscript.net/images/Minimal-jQuery-Loading-Overlay-Spinner-Plugin-Easy-Overlay.jpg'
		if (this.state.banners.length > 0) {
			banners = this.state.banners
			return (
				<Carousel
					autoplay
					autoplayTimeout={3000}
					loop
					index={0}
					pageSize={BannerWidth}
					activePageIndicatorStyle={{ backgroundColor: primary }}
				>
					{banners.map((item, index) => this.renderPage(item, index))}
				</Carousel>
			)
		}
		return (
			<View style={{ flex: 1, height: 137 }} style={styles.slide1}>
				<ActivityIndicator style={{ height: 137 }} />
			</View>
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
	openDetail(food) {
		this.setState({ disabled: true })
		this.props.navigation.navigate('FoodTab', { parrent: food })
		InteractionManager.runAfterInteractions(() => {
			this.setState({ disabled: false })
		})
	}
	renderDiscount(data) {
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
	}
	renderOldPrice(data) {
		if (data.productMetaData[1]) {
			for (i in data.productMetaData) {
				if (data.productMetaData[i].name == 'Discount') {
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
					<Text style={[styles.oldPriceText, { color: 'white' }]}>22132132</Text>
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
			if (food.productMetaData[i].name == 'ImageUrl') {
				if (food.productMetaData[i]) {
					imageUrl = food.productMetaData[i].value
				}
			}
		}

		var shopName = ''
        if(food.storeProducts[0]){
            shopName = food.storeProducts[0].store.name
        }

		var price = this.priceHandle(food.price)
		var price = this.priceHandle(food.price)
		for (i in food.productMetaData) {
			if (food.productMetaData[i].name == 'Discount') {
				var discountPrice = food.price * (food.productMetaData[i].value / 100)
				price = this.priceHandle(food.price - discountPrice)
			}
		}
		return (
			<View>
				<TouchableOpacity disabled={this.state.disabled} onPress={() => { this.openDetail(food) }} style={{ flex: 1, alignItems: 'center' }} >
					<Grid style={styles.cellContainer}>
						<Row style={styles.upContainer}>
								<Image resizeMode='cover' style={styles.foodThumnail} source={{ uri: imageUrl }} >
									{this.renderDiscount(data.item)}
								</Image>
						</Row>
						<Row style={styles.downContainer}>
							<Text style={styles.foodNameText}>{food.name}</Text>
							<View style={{ paddingLeft: 2, flex: 1, width: '100%' }}>
								<Row style={{ justifyContent: 'space-between', marginTop: 3 }} >
									<Row style={{ alignSelf: 'flex-end' }} >
										<Icon name='ios-pin' style={styles.locationIcon} />
										<Text style={styles.shopNameText}>{shopName}</Text>
									</Row>
									{this.renderOldPrice(data.item)}
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
	_keyExtractor = (item, index) => item.id;
	renderHorizontalList(item) {
		var section = item.item
		return (
			<View style={{ flex: 1 }}>
				<View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
					<Text style={styles.sectionText} note>{section.sectionName}</Text>
				</View>
				<FlatList style={{ marginTop: 10, marginRight: -15 }}
					showsHorizontalScrollIndicator={false}
					horizontal={true}
					data={section.food}
					extraData={section.food}
					keyExtractor={this._keyExtractor}
					dataArray={section.food}
					renderItem={(item) =>
						<View style={{ borderBottomWidth: 0, marginRight: 5, }}>
							{this.renderCell(item)}
						</View>
					}>
				</FlatList>
			</View>
		)
	}
	renderList() {
		return (
			<FlatList showsVerticalScrollIndicator={false}
				style={{ flex: 1, marginLeft: -10 }}
				data={this.state.dataSection}
				keyExtractor={(item) => item.sectionName}
				extraData={this.state.dataSection}
				renderItem={(item) =>
					<ListItem style={{ marginBottom: -15, borderBottomWidth: 0 }} >
						{this.renderHorizontalList(item)}
					</ListItem>
				}>
			</FlatList>
		)
	}
	render() {
		const navigation = this.props.screenProps.navi;
		return (
			<Container style={styles.container}>
				<Spinner visible={this.state.isLoading} />
				<HeaderContent leftIcon={'menu'} navi={navigation} leftButton={() => navigation.navigate("DrawerOpen")}
					rightButton={true} title='Đề xuất'>
				</HeaderContent>
				<Content>
					<View style={styles.pageBanner}>
						{this.pageBanner()}
					</View>
					<View style={styles.mainContent}>
						{this.renderList()}
					</View>
				</Content>
			</Container>
		);
	}
}

function bindActions(dispatch) {
	return {
		fetchTrending: (params) => dispatch(fetchTrendingRecomend(params)),
		fetchBanner: () => dispatch(fetchBanner()),

	};
}

const mapStateToProps = state => ({
	fetchTrendingRecomend: state.fetchTrendingRecomend,
	fetchLastestRecomend: state.fetchLastestRecomend,
	fetchLowestRecomend: state.fetchLowestRecomend,
	fetchBannerRecomend: state.fetchBannerRecomend
});

export default connect(mapStateToProps, bindActions)(RecommendFood);

