import React, { Component } from "react";
import { Image, View, TouchableOpacity } from "react-native";

import { List, ListItem, Header, Container, Content, Text, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import HeaderContent from "./../headerContent/";
import Swiper from 'react-native-swiper';


import styles from "./styles";

class RecommendFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
		};
	}
	pageBanner() {
		return (
			<Swiper height={170} autoplay={true}>
				<View style={{ flex: 1, backgroundColor: 'red' }}>
					<Text note>Hello Swiper</Text>
				</View>
				<View style={{ flex: 1, backgroundColor: 'green' }}>
					<Text note>Hi</Text>
				</View>
				<View style={{ flex: 1, backgroundColor: 'blue' }}>
					<Text note>Chao</Text>
				</View>
			</Swiper>
		)
	}
	renderCell(food) {
		return (
			<View>
				<TouchableOpacity style={{ flex: 1 }}>
					<Thumbnail square source={{ uri: 'http://www.ingredientsnetwork.com/47/pdcnewsitem/03/77/23/Cajun-Steak-with-Potatoes-_-Vegetables-cropped.jpg' }} />
					<Text style={styles.foodNameText}> Thịt Bò </Text>
					<Text style={styles.shopNameText}> 78 Duy Tan </Text>
					<Text style={styles.priceText}> 1.000.000 </Text>
				</TouchableOpacity>
			</View>
		)
	}
	renderHorizontalList(foods) {
		return (
			<List horizontal={true} itemDivider={false} dataArray={foods}
				renderRow={(item) =>
					<ListItem>
						{this.renderCell(item)}
					</ListItem>
				}>
			</List>
		)
	}
	renderList() {
		var items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can']
		return (
			<List itemDivider={false} dataArray={items} renderSeparator={() =>
				<View>
				</View>
			}
				renderRow={(item) =>
					<ListItem>
						{this.renderHorizontalList(items)}
					</ListItem>
				}>
			</List>
		)
	}
	render() {
		const navigation = this.props.navigation;
		return (
			<Container>
				<Header>
				</Header>
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
