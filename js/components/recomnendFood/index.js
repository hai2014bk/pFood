import React, { Component } from "react";
import {Text, Image, View, TouchableOpacity } from "react-native";

import { List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';
import styles from "./styles";

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
	}
	pageBanner() {
		return (
			<Swiper height={170} autoplay={true}>
				<View style={{ flex: 1 }}>
					<Image
						style={{ flex:1 }}
						source={{ uri: steak }}
					/>
				</View>
				<View style={{ flex: 1}}>
					<Image
						style={{ flex:1 }}
						source={{ uri: pizza }}
					/>
				</View>
				<View style={{ flex: 1}}>
					<Image
						style={{ flex:1 }}
						source={{ uri:bbq  }}
					/>
				</View>
			</Swiper>
		)
	}
	renderCell(food) {
		return (
			<View>
				<TouchableOpacity style={{ flex: 1, alignItems: 'center' }}>
					<Thumbnail style={styles.foodThumnail} square source={{ uri: 'http://www.ingredientsnetwork.com/47/pdcnewsitem/03/77/23/Cajun-Steak-with-Potatoes-_-Vegetables-cropped.jpg' }} />
					<Text style={styles.foodNameText}> Thịt Bò </Text>
					<Text style={styles.shopNameText}> Vin Market </Text>
					<Text style={styles.priceText}> 200.000 VNĐ </Text>
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
				<List style={{ marginLeft: -15, marginRight: -15 }} showsHorizontalScrollIndicator={false} horizontal={true} dataArray={foods}
					renderRow={(item) =>
						<ListItem style={{ borderBottomWidth: 0 }}>
							{this.renderCell(item)}
						</ListItem>
					}>
				</List>
			</View>
		)
	}
	renderList() {
		var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can']
		return (
			<List style={{ flex: 1 }} dataArray={items}
				renderRow={(item) =>
					<ListItem style={{marginBottom:-10, borderBottomWidth: 0 }}>
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
				<HeaderContent leftIcon={'menu'} leftButton={()=> navigation.navigate("DrawerOpen")} 
					rightButton={true} title='Recommend'>
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
