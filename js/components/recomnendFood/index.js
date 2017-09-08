import React, { Component } from "react";
import { Alert, FlatList, InteractionManager, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import { fetchBanner, fetchTrendingRecomend } from "../../actions/fetchTrendingRecomend.js"
import Swiper from 'react-native-swiper';
import styles from "./styles";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
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
	componentDidMount() {
		var date = new Date()
		let isoDate = date.toISOString().slice(0, -1)
		// console.log('2321321', isoDate)
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
			// console.log('dskjfdaklsf')
			if (props.fetchBannerRecomend.data.model[0]) {
				// console.log('dskjfdakls22221')
				var listBanner = props.fetchBannerRecomend.data.model
				this.setState({ banners: listBanner, bannerLoaded: true })
			}
		}
		if (props.fetchTrendingRecomend.success && !this.state.tredingLoaded) {
			if (props.fetchTrendingRecomend.data.model[0]) {
				var listFood = props.fetchTrendingRecomend.data.model
				for (i in listFood) {
					listFood[i].quantity = 0
				}
				var trendingFood = {}
				trendingFood.sectionName = 'Được xem nhiều nhất'
				trendingFood.food = listFood
				var dataSection = this.state.dataSection
				dataSection.push(trendingFood)
				this.setState({ dataSection: dataSection, tredingLoaded: true })
			}
		}
		if (props.fetchLastestRecomend.success && !this.state.lastestLoaded) {
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
			setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
		}
	}

	pageBanner() {
		var banners = []
		var imageLoad = 'http://www.jqueryscript.net/images/Minimal-jQuery-Loading-Overlay-Spinner-Plugin-Easy-Overlay.jpg'		
		if (this.state.banners[0]) {
			banners = this.state.banners
			// console.log('213213213', banners[0].imageUrl)
			return (
				<Swiper activeDotColor={primary} height={137} autoplay={true}>
					{banners.map((item, key) => {
						return (
							<View style={{ flex: 1 }} key={key} style={styles.slide1}>
								<Image style={styles.imageBanner} source={{ uri: item.imageUrl }} />
							</View>
						)
					})
					}
				</Swiper>
			)
		} 
		return (
			<Swiper activeDotColor={primary} height={137} autoplay={true}>
							<View style={{ flex: 1 }} style={styles.slide1}>
								<Image style={styles.imageBanner} source={{ uri: imageLoad }} />
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
	openDetail(food) {
		this.setState({ disabled: true })
		this.props.navigation.navigate('FoodTab', { parrent: food })
		InteractionManager.runAfterInteractions(() => {
			this.setState({ disabled: false })
		})
	}
	priceHandle(price) {
		var count = 0
		price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
		return price
	}
	renderCell(data) {
		var food = data.item
		var imageUrl = 'http://runawayapricot.com/wp-content/uploads/2014/09/placeholder.jpg'
		if (food.productMetaData[0]) {
			imageUrl = food.productMetaData[0].value
		}
		var price = this.priceHandle(food.price)
		return (
			<View>
				<TouchableOpacity disabled={this.state.disabled} onPress={() => { this.openDetail(food) }} style={{ flex: 1, alignItems: 'center' }} >
					<Grid style={styles.cellContainer}>
						<Row style={styles.upContainer}>
							<Image resizeMode='cover' style={styles.foodThumnail} source={{ uri: imageUrl }} >
								<View style={styles.saleView}>
									<Text style={styles.saleText}>-10%</Text>
								</View>
							</Image>
						</Row>
						<Row style={styles.downContainer}>
							<Text numberOfLines={2} style={styles.foodNameText}>{food.name}</Text>
							<View style={{ paddingLeft: 2, flex: 1, width: '100%' }}>
								<Row style={{ justifyContent: 'space-between', marginTop: 3 }} >
									<Row style={{ alignSelf: 'flex-end' }} >
										<Icon name='ios-pin' style={styles.locationIcon} />
										<Text style={styles.shopNameText}>Vinmart</Text>
									</Row>
									<Text style={styles.oldPriceText}>322.000đ</Text>
								</Row>
								<Row style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }} size={1}>
									<Text style={styles.priceText}>{price} đ</Text>
									<View style={{
										marginRight: 2, marginRight: 5
									}}>
										{this.renderStar(food.rate)}
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
					<ListItem >
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

