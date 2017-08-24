import React, { Component } from "react";
import { AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
import * as mConstants from '../../utils/Constants'
import StarRating from 'react-native-star-rating';
import { Icon, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";
const primary = require("../../themes/variable").brandPrimary;


const steak = 'http://www.chadwicksbutchers.com/wp-content/uploads/fillet-steak-banner-e1485792041266.jpg'
const pizza = 'http://bijespizza.com/Site/themed_images/pizza_1_lg.png'
const bbq = 'http://nutright.com/blog/wp-content/uploads/2017/01/bbq-islamabad.jpg'
class RecommendFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
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
			<Swiper activeDotColor={primary} height={137} autoplay={true}>
				<View style={{ flex: 1 }}>
					<Image
						style={{ flex: 1 }}
						source={{ uri: steak }}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Image
						style={{ flex: 1 }}
						source={{ uri: pizza }}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Image
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
				starSize={9}
			/>
		)
	}
	renderCell(food) {
		return (
			<View>
				<TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
					<Grid style={styles.cellContainer}>
						<Row style={styles.upContainer}>
							<Image resizeMode='cover' style={styles.foodThumnail} source={{ uri: 'https://36iusc2tb88y2g492si2bqd1-wpengine.netdna-ssl.com/wp-content/uploads/2016/09/meat-1.jpg' }} >
								<View style={styles.saleView}>
									<Text style={styles.saleText}>-10%</Text>
									</View> 
							</Image>
						</Row>
						<Row style={styles.downContainer}>
							<Text numberOfLines={2} style={styles.foodNameText}>Thịt hun khói</Text>
							<Row style={{ marginBottom: 0 }}>
								<Col size={1}>
									<Row style={{ marginTop: 6 }}>
										<Icon name='ios-pin' style={styles.locationIcon} />
										<Text style={styles.shopNameText}>Vinmart</Text>
									</Row>
									<Text style={styles.priceText}>200.000đ</Text>
								</Col>
								<Col style={{ justifyContent: 'space-between', alignItems:'flex-end' }} size={1}>
									<Text style={styles.oldPriceText}>322.000đ</Text>
									<View style={{
										marginRight:2,
									}}>
										{this.renderStar(3.5)}
									</View>
								</Col>
							</Row>
						</Row>
					</Grid>
				</TouchableOpacity>
			</View>
		)
	}
	renderHorizontalList(foods) {
		return (
			<View style={{ flex: 1 }}>
				<View style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
					<Text style={styles.sectionText} note>Đề xuất cho bạn</Text>
				</View>
				<List style={{ marginTop: 10, marginLeft: -10, marginRight: -15 }} showsHorizontalScrollIndicator={false} horizontal={true} dataArray={foods}
					renderRow={(item) =>
						<View style={{ borderBottomWidth: 0, marginRight: 5, }}>
							{this.renderCell(item)}
						</View>
					}>
				</List>
			</View>
		)
	}
	renderList() {
		var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can']
		return (
			<List showsVerticalScrollIndicator={false} style={{ flex: 1, marginLeft:5 }} dataArray={items}
				renderRow={(item) =>
					<ListItem >
						{this.renderHorizontalList(items)}
					</ListItem>
				}>
			</List>
		)
	}
	render() {
		const navigation = this.props.navi;
		return (
			<Container style={styles.container}>
				<HeaderContent leftIcon={'menu'} leftButton={() => navigation.navigate("DrawerOpen")}
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

export default RecommendFood;
