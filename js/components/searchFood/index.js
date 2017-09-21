import React, { Component } from "react";
import { Keyboard, ActivityIndicator, InteractionManager, FlatList, Image, View, TouchableOpacity, Platform, Text, AsyncStorage, Alert } from "react-native";
import StarRating from 'react-native-star-rating';
import { NavigationActions } from "react-navigation";
import { searchFood, searchPopular } from "../../actions/searchFood.js"
import HeaderContent from "./../headerContent/";
import { Item, Input, CheckBox, Card, CardItem, Container, Header, Content, Button, Icon, Left, Right, Body, List, ListItem, Thumbnail } from "native-base";
import { Grid, Col, Row } from "react-native-easy-grid";
import { reRenderHeader } from '../../actions/header'
import Spinner from "react-native-loading-spinner-overlay";
import * as appFunction from "../../utils/function"
import * as mConstants from '../../utils/Constants'
import { connect } from "react-redux";
import PopupDialog, { DialogTitle, DialogButton } from 'react-native-popup-dialog';

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");
const primary = require("../../themes/variable").brandPrimary;
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Categories" })],
});
class SearchFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			dataPopular: [],
			index: 1,
			isSearch: false,
			sortBy: '',
			sortDirection: '',
			changeSort: false,
			shouldLoadMore: false,
			disabled: false,
			isLoading: false,
			searchText: '',
			searched: false,
			loadedAll: false,
			field: {
				Id: false,
				Name: false,
				Price: false,
				RateCount: false
			},
			direction: {
				Desc: false,
				Asc: false,
			},
			shipTypes: {
				ViettelPost: true,
				Adayroi: false,
				Grab: false,
				Uber: false
			},
			item: {},
			ship: 'ViettelPost',
		};
	}

	componentDidMount() {
		this.props.fetchPopular()
	}
	uniq(a) {
		var seen = [];
		var out = [];
		var len = a.length;
		var j = 0;
		for (var i = 0; i < len; i++) {
			var item = a[i];

			if (seen.indexOf(item.id) == -1) {
				seen.push(item.id)
				out[j++] = item;
			}
		}
		return out;
	}

	componentWillReceiveProps(props) {
		this.setState({ isLoading: false })
		if (props.searchPopular.success && !this.state.searched) {
			var data = props.searchPopular.data.model
			for (i in data) {
				data[i].id = i
			}
			this.setState({ dataPopular: data })
		}
		if (props.searchFood.success && this.state.searched) {
			if (props.searchFood.data.model.length > 0) {
				var data = this.state.data
				data.splice(data.length - 1, 1)
				this.setState({ data: data })
				var listFood = []
				if (this.state.isSearch) {
					listFood = props.searchFood.data.model
				} else {
					listFood = this.state.data.concat(props.searchFood.data.model)
				}
				for (i in listFood) {
					if (!listFood[i].quantity) {
						listFood[i].quantity = listFood[i].quantityStep * listFood[i].minOrderedItems
						let metaData = listFood[i].productMetaData
						for (j in metaData) {
							if (metaData[j].name == 'Discount') {
								let discountPrice = listFood[i].price * metaData[j].value / 100
								listFood[i].price = listFood[i].price - discountPrice
							}
						}
					}
				}
				listFood = this.uniq(listFood)
				if (listFood.length >= 15) {
					var loadMoreElement = {
						name: 'loadmore',
						id: 'wioejqwjeqw'
					}
					listFood.push(loadMoreElement)
					this.setState({ shouldLoadMore: true })
				}
				this.setState({ data: listFood })
			} else {
				if (this.state.isSearch) {
					this.setState({ data: [], loadedAll: true })
				} else {
					var data = this.state.data
					data.splice(data.length - 1, 1)
					this.setState({ data: data, loadedAll: true })
				}
			}
		}
		if (!props.searchFood.success) {
			setTimeout(() => { Alert.alert('Lỗi mạng', 'Có vấn đề khi kết nối đến máy chủ') })
		}
	}

	loadMore() {
		if (!this.state.loadedAll && this.state.shouldLoadMore) {
			var index = this.state.index + 1
			const { params } = this.props.navigation.state
			var parameter = {
				"PageSize": "15",
				"PageIndex": index,
				"searchTerm": this.state.searchText

			}
			this.setState({ isSearch: false, index: this.state.index + 1 })
			this.props.fetch(parameter)
		}
	}
	pickerWrap(text, key, type) {
		let boxType = type === 'field' ? this.state.field : this.state.direction;
		let checked = boxType[key] ? true : false;
		return (
			<TouchableOpacity onPress={() => this.updateStatus(key, type)} style={styles.pickerWrap}>
				<CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateStatus(key, type)} />
				<Text style={styles.checkboxText}>{text}</Text>
			</TouchableOpacity>
		)
	}
	updateStatus(key, type) {
		let boxType = type === 'field' ? Object.assign({}, this.state.field) : Object.assign({}, this.state.direction);
		for (let k in boxType) {
			if (boxType.hasOwnProperty(k)) {
				boxType[k] = false;
				if (k === key) {
					boxType[k] = true;
				}
			}
		}
		if (type === 'field') {
			this.setState({ field: boxType, sortBy: key });
		} else {
			this.setState({ direction: boxType, sortDirection: key });
		}
	}

	plus(rowID) {
		let newArray = this.state.data.slice(0);
		newArray[rowID] = {
			...this.state.data[rowID],
			quantity: this.state.data[rowID].quantity + this.state.data[rowID].quantityStep
		}
		this.setState({
			data: newArray,
		});
	}


	minus(rowID) {
		let newArray = this.state.data.slice(0);
		newArray[rowID] = {
			...this.state.data[rowID],
			quantity: this.state.data[rowID].quantity - this.state.data[rowID].quantityStep > 0 ? this.state.data[rowID].quantity - this.state.data[rowID].quantityStep : 0,
		};
		this.setState({
			data: newArray
		});
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
				starSize={13}
			/>
		)
	}

	priceHandle(price) {
		var count = 0
		price = price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")
		return price
	}

	openDetail(food) {
		this.props.navigation.navigate('FoodTab', { parrent: food })
		InteractionManager.runAfterInteractions(() => {
			this.setState({ disabled: false })
		})
	}
	renderSort() {
		return (
			<View style={styles.sortWrap}>
				<View style={styles.sortFieldWrap}>
					{this.pickerWrap('Mã sản phẩm', 'Id', 'field')}
					{this.pickerWrap('Tên sản phẩm', 'Name', 'field')}
					{this.pickerWrap('Giá sản phẩm', 'Price', 'field')}
					{this.pickerWrap('Đánh giá', 'RateCount', 'field')}
				</View>
				<View style={styles.sortDirectionWrap}>
					{this.pickerWrap('Tăng dần', 'Asc', 'direction')}
					{this.pickerWrap('Giảm dần', 'Desc', 'direction')}
				</View>
			</View>
		)
	}
	sortButton() {
		this.popupDialog.dismiss()
		this.setState({ loadedAll: false })
		const { params } = this.props.navigation.state
		var parameter = {
			"PageSize": 10,
			"PageIndex": this.state.index,
			"OrderBy": this.state.sortBy,
			"OrderDirection": this.state.sortDirection,
			"CategoryId": params.parent.id
		}
		this.setState({ isSort: true })
		this.props.fetch(parameter)
	}
	onDismissed() {

	}

	renderSortPopup() {
		var disable = false
		if (this.state.sortBy == '' || this.state.sortDirection == '') {
			disable = true
		}
		return (
			<PopupDialog
				dialogTitle={<DialogTitle title="Sắp xếp" />}
				ref={(popupDialog) => { this.popupDialog = popupDialog; }}
				onDismissed={() => this.onDismissed()}
				dialogStyle={{ marginTop: -200 }}
				width={300}
				height={300}
				actions={[
					<DialogButton
						text="OK"
						disabled={disable}
						onPress={() => {
							this.sortButton()
						}}
						key="button-1"
					/>,
				]}
			>
				<View style={{ flex: 1 }}>
					{this.renderSort()}
				</View>

			</PopupDialog>
		)
	}
	renderDiscount(data) {
		console.log('9021321321321xzca',data)
		if (data.name !='loadmore') {
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
	}

	searchPopular(text) {
		this.setState({ searchText: text, searched: true, index: 1, isLoading: true })
		var params = {
			"PageSize": "15",
			"PageIndex": "1",
			"searchTerm": text
		}
		this.props.fetch(params)
	}

	renderSearchItems(data) {
		var item = data.item
		return (
			<TouchableOpacity style={{ flex: 1, marginTop: 10 }} onPress={() => this.searchPopular(item.term)}>
				<Text style={styles.popularText}>{item.term}</Text>
			</TouchableOpacity>
		)
	}

	renderItems(data) {
		if (data.index == this.state.data.length - 1 && this.state.data.length > 10 && !this.state.loadedAll) {
			return (
				<View style={styles.loadMoreCell}>
					<ActivityIndicator />
					<Text style={styles.loadMoreText} >Tải thêm...</Text>
				</View>
			)
		}
		let item = data.item
		let active = 0
		let color = ''
		var quantity = appFunction.handleUnitType(item.unitType, item.quantity)
		var disabled = false
		var imageUrl = 'http://runawayapricot.com/wp-content/uploads/2014/09/placeholder.jpg'
		for (i in item.productMetaData) {
			if (item.productMetaData[i].name == 'ImageUrl') {
				if (item.productMetaData[i]) {
					imageUrl = item.productMetaData[i].value
				}
			}
		}
		if (item.quantity >= item.quantityStep * item.minOrderedItems) {
			if (item.quantity == item.quantityStep * item.minOrderedItems) {
				disabled = true
				color = '#cecece'
				active = 1
			} else {
				disabled = false
				active = 0.2
				color = primary
			}
			buttonAdd = (
				<Button addCart onPress={() => { this.addtoCart(item); this.setState({ item }) }} >
					<Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
				</Button>
			)
		} else {
			active = 1,
				color = '#cecece',
				disabled = true
			buttonAdd = (
				<Button disabled={true} style={{ backgroundColor: '#cecece' }} addCart >
					<Text numberOfLines={1} style={styles.textAdd}> Thêm vào giỏ </Text>
				</Button>
			)
		}
		let id = item.id
		var price = ''
		if (item.price) {
			price = this.priceHandle(item.price)
		}

		return (
			<TouchableOpacity disabled={this.state.disabled} onPress={() => { this.setState({ disabled: true }), this.openDetail(item) }}>
				<Card style={styles.card}>
					<CardItem >
						<Body>
							<Grid >
								<Col size={2} style={styles.imageWrap}>
									<View style={styles.imageContainer}>
										<Image source={{ uri: imageUrl }} style={styles.image}>
											{this.renderDiscount(item)}
										</Image>
									</View>
								</Col>
								<Col size={3} style={styles.infoWrap}>
									<Text style={styles.foodName}>{item.name}</Text>
									<Text style={styles.unit}> {item.quantityStep} {item.unitType}</Text>
									<Row style={{ alignItems: 'flex-end' }} >
										<Icon name='ios-pin' style={styles.locationIcon} />
										<Text style={styles.shopName}>{item.cities}</Text>
									</Row>
									<View style={{ width: 50 }}>
										{this.renderStar(item.avgRate)}
									</View>
									<Text style={styles.price}> {price}đ/ <Text style={styles.perPrice}>{item.quantityStep} {item.unitType}</Text></Text>
								</Col>
								<TouchableOpacity activeOpacity={1} style={styles.buyColumn}>
									<Col style={styles.buttonWrap}>
										<TouchableOpacity disabled={disabled} activeOpacity={active} style={[styles.iconWrapMinus, { borderColor: color }]} onPress={() => this.minus(data.index)} >
											<Icon style={[styles.icon, { color: color }]} name="md-remove" />
										</TouchableOpacity>

										<Col style={styles.quantityContainer}>
											<Text style={styles.quantity}>{quantity}</Text>
										</Col>
										<TouchableOpacity style={styles.iconWrapPlus} onPress={() => this.plus(data.index)} >
											<Icon name="md-add" style={styles.icon} />
										</TouchableOpacity>
									</Col>
									<Col style={styles.buttonAddCard}>
										{buttonAdd}
									</Col>
								</TouchableOpacity>
							</Grid>
						</Body>
					</CardItem>
				</Card>
			</TouchableOpacity>
		)
	}
	openSort() {
		this.popupDialog.show();
	}

	updateShipStatus(key) {
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

	shipPickerWrap(text, key) {
		let shipTypes = this.state.shipTypes
		let checked = shipTypes[key] ? true : false;
		return (
			<TouchableOpacity style={styles.pickerWrap} onPress={() => this.updateShipStatus(key)}>
				<CheckBox style={styles.checkBox} color='#43CA9C' checked={checked} onPress={() => this.updateShipStatus(key)} />
				<Text style={styles.checkboxText}>{text}</Text>
			</TouchableOpacity>
		)
	}

	renderShipPopup() {
		return (
			<PopupDialog
				dialogTitle={<DialogTitle title="Hình thức vận chuyển" />}
				ref={(shipPopupDialog) => { this.shipPopupDialog = shipPopupDialog; }}
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
					{this.shipPickerWrap('Viettel Post', 'ViettelPost')}
					{this.shipPickerWrap('Adayroi', 'Adayroi')}
					{this.shipPickerWrap('Grab', 'Grab')}
					{this.shipPickerWrap('Uber', 'Uber')}
				</View>
			</PopupDialog>
		)
	}

	async addtoCart(item) {
		let data = []
		try {
			const value = await AsyncStorage.getItem(mConstants.CART);
			if (value !== null) {
				data = JSON.parse(value)
				if (data.length > 0) {
					for (let i = 0; i <= data.length; i++) {
						if (data[i].purveyorId == item.purveyorId) {
							item.shipType = data[i].shipType
							appFunction.add(item, this.props)
						} else {
							this.shipPopupDialog.show()
						}
					}
				} else {
					this.shipPopupDialog.show()
				}
			} else {
				this.shipPopupDialog.show()
			}
		} catch (error) {
		}
	}

	addCart() {
		let item = this.state.item
		item.shipType = this.state.ship
		appFunction.add(item, this.props)
		this.shipPopupDialog.dismiss()
	}

	search() {
		this.setState({ searched: true, isSearch: true, index: 1, isLoading: true })
		var params = {
			"PageSize": "15",
			"PageIndex": "1",
			"searchTerm": this.state.searchText
		}
		this.props.fetch(params)
		Keyboard.dismiss()
	}

	deleteSearch() {
		this.setState({ searchText: '' })
	}

	renderContent() {
		const navigation = this.props.screenProps.navi;
		const { params } = this.props.navigation.state
		var data = this.state.data
		if (!this.state.searched) {
			data = this.state.dataPopular
			return (
				<View style={{ flex: 1 }}>
					<Text style={styles.popularHeader}> Xu hướng </Text>
					<FlatList style={{ marginTop: 5 }}
						data={data}
						scrollEnabled={false}
						extraData={this.state}
						keyExtractor={(item) => item.id}
						renderItem={(item) => (
							<View style={{ borderBottomWidth: 0 }} >
								{this.renderSearchItems(item)}
							</View>
						)
						}
					/>
				</View>
			)
		}
		if (this.state.searched && data.length == 0 && !this.state.isLoading) {
			return (
				<View style={{ width: '100%', marginTop: 100 }}>
					<Text style={{ alignSelf: 'center' }} note>Không có kết quả</Text>
				</View>
			)
		}
		return (
			<View style={{ flex: 1 }}>
				<FlatList style={{ marginTop: 5 }}
					onEndReached={(distanceFromEnd) => this.loadMore()}
					onEndReachedThreshold={0.5}
					data={data}
					extraData={this.state}
					keyExtractor={(item) => item.id}
					renderItem={(item) => (
						<View style={{ flex: 1, borderBottomWidth: 0 }} >
							{this.renderItems(item)}
						</View>
					)
					}
				/>
				{this.renderSortPopup()}
				{this.renderShipPopup()}
			</View>
		);
	}

	render() {
		const navigation = this.props.screenProps.navi;
		const { params } = this.props.navigation.state
		var data = this.state.data
		return (
			<Container keyboardShouldPersistTaps='handle' style={styles.container}>
				<HeaderContent keyboardShouldPersistTaps='handle'
					navi={navigation}
					value={this.state.searchText}
					changeText={(text) => { this.setState({ searchText: text }) }}
					leftSearchMenu={() => navigation.navigate('DrawerOpen')} rightButton={true} leftSearchMenuIcon={'menu'}
					deleteSearch={() => { this.deleteSearch() }}
					search={() => this.search()} />
				<Spinner visible={this.state.isLoading} />
				{this.renderContent()}
			</Container>
		);
	}
}
function bindActions(dispatch) {
	return {
		fetch: (params) => dispatch(searchFood(params)),
		fetchPopular: () => dispatch(searchPopular()),
		reRenderHeader: () => dispatch(reRenderHeader())
	};
}

const mapStateToProps = state => ({
	searchFood: state.searchFood,
	searchPopular: state.searchPopular
});

export default connect(mapStateToProps, bindActions)(SearchFood);