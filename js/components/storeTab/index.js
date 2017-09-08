import React, { Component } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";

import { Icon, Button, Footer, FooterTab, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import ScrollableTabView from "react-native-scrollable-tab-view";
import HeaderContent from "./../headerContent/";
import RecommendFood from "./../recomnendFood/";
import StoreInfo from "./../storeInfo/";
import Swiper from 'react-native-swiper';
import CustomTabBar from "./CustomTabBar";
import StoreProduct from './../storeProduct';

import styles from "./styles";

class StoreTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'recommend'
		};
	}
	selected(tab) {
		this.setState({ selectedTab: tab })
	}
	render() {
		const navigation = this.props.navigation;
		const { params } = this.props.navigation.state
		console.log('2321321321',params)
		
		return (
			<Container>
				<HeaderContent navi={this.props.screenProps.navi} rightButton={true} leftIcon={'ios-arrow-back'} leftButton={() => navigation.goBack()}
					 title={params.parrent.name}>
				</HeaderContent>
				<ScrollableTabView locked={false} renderTabBar={() => <CustomTabBar someProp={"here"} />} tabBarPosition={'top'} >
					<StoreProduct screenProps={{navi:navigation}} storeParrent={params.parrent}   tabLabel="Sản phẩm" />
					<StoreInfo screenProps={{navi:navigation}} storeParrent={params.parrent}  tabLabel="Thông tin" />
				</ScrollableTabView>
			</Container>
		);
	}
}

export default StoreTab;
