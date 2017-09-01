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
		return (
			<Container>
				<HeaderContent navi={navigation} leftIcon={'ios-arrow-back'} leftButton={() => navigation.goBack()}
					rightButton={true} title='BigC'>
				</HeaderContent>
				<ScrollableTabView locked={true} renderTabBar={() => <CustomTabBar someProp={"here"} />} tabBarPosition={'top'} >
					<StoreProduct screenProps={{navi:navigation}}   tabLabel="Sản phẩm" />
					<StoreInfo screenProps={{navi:navigation}}  tabLabel="Thông tin" />
				</ScrollableTabView>
			</Container>
		);
	}
}

export default StoreTab;