import React, { Component } from "react";
import { FlatList, Platform, Dimensions, AsyncStorage, Text, Image, View, TouchableOpacity } from "react-native";
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

class StoreProduct extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21, 34, 213, 123, 12]
		};
	}
	componentDidMount() {

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
				starSize={10}
			/>
		)
	}
	_keyExtractor = (item, index) => item;
	renderCell(food) {
		return (
			<View>
				<TouchableOpacity style={{ flex: 1,  alignItems: 'center' }} >
					<Grid style={styles.cellContainer}>
						<Row style={styles.upContainer}>
							<Image resizeMode='cover' style={styles.foodThumnail} source={{ uri: 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png' }} >
								<View style={styles.saleView}>
									<Text style={styles.saleText}>-10%</Text>
								</View>
							</Image>
						</Row>
						<Row style={styles.downContainer}>
							<Row style={{flex:1, width:'100%', justifyContent: 'space-between' }}>
								<Text numberOfLines={2} style={styles.foodNameText}>Thịt Bò</Text>
								<Text style={styles.oldPriceText}>50g</Text>
							</Row>
							<Row style={{ alignSelf: 'flex-start' }} >
								<Icon name='ios-pin' style={styles.locationIcon} />
								<Text style={styles.shopNameText}>Vinmart</Text>
							</Row>
							<View style={{ paddingLeft: 2, flex: 1, width: '100%' }}>
								<Row style={{ justifyContent: 'flex-end', marginTop: 3 }} >
									<Text style={styles.oldPriceText}>322.000đ</Text>
								</Row>
								<Row style={{ flex: 1, justifyContent: 'space-between', alignItems: 'flex-end' }} size={1}>
									<View style={{
										marginRight: 2, marginRight: 5
									}}>
										{this.renderStar(3.5)}
									</View>
									<Text style={styles.priceText}>1.000.00đ</Text>
								</Row>
							</View>
						</Row>
					</Grid>
				</TouchableOpacity>
			</View>
		)
	}

	render() {
		var imageUrl = 'https://hlfppt.org/wp-content/uploads/2017/04/placeholder.png'
		// if (this.state.food.productMetaData) {
		// 	imageUrl = this.state.food.productMetaData[0].value
		// }
		const navigation = this.props.navi;
		return (
			<Container style={styles.container}>
				<Content style={{ flex: 1 }}>
					<View style={{flexDirection:'row'}}>
						<Image resizeMode='cover' source={{ uri: imageUrl }} style={styles.foodImage} />
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
		fetch: (id) => dispatch(fetchDetail(id)),
	};
}

const mapStateToProps = state => ({
	fetchDetail: state.fetchDetail,
});

export default connect(mapStateToProps, bindActions)(StoreProduct);