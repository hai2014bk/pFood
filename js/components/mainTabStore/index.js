import React, { Component } from "react";
import {BackHandler, Text, Image, View, TouchableOpacity } from "react-native";

import { Icon, Button, Footer, FooterTab, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import ScrollableTabView from "react-native-scrollable-tab-view";
import HeaderContent from "./../headerContent/";
import Trending from "./../trending/";
import Categories from "./../categories/";
import Login from "./../login/";
import SignUp from "./../sign-up/";
import Swiper from 'react-native-swiper';
import CustomTabBar from "./CustomTabBar";
import StoreStack from '../../storeStack';
import SearchStoreStack from '../../searchStoreStack';
import NearbyStoreStack from '../../nearbyStoreStack';
import PurveyorStack from '../../purveyorStack';

import styles from "./styles";

class MainTabStore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'recommend'
		};
	}
	selected(tab) {
		this.setState({ selectedTab: tab })
	}
	componentDidMount(){
		console.log(';2dwsadas')
		BackHandler.addEventListener("hardwareBackPress", this.onBackPress);		
	}
	componentWillUnmount() {
		BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	  }
	onBackPress(){
		BackHandler.exitApp()
		 return true;
	}
	render() {
		const navigation = this.props.navigation;
		return (
			<Container>
				<ScrollableTabView locked={true} renderTabBar={() => <CustomTabBar someProp={"here"} />} tabBarPosition={'bottom'} >
					<StoreStack screenProps={{ navi: navigation }} tabLabel="Cửa hàng" />
					<SearchStoreStack screenProps={{ navi: navigation }} tabLabel="Tìm kiếm" />
					<NearbyStoreStack screenProps={{ navi: navigation }} tabLabel="Gần đây" />
					<PurveyorStack screenProps={{ navi: navigation }} tabLabel="Trang Trại" />
				</ScrollableTabView>
			</Container>
		);
	}
}

export default MainTabStore;
