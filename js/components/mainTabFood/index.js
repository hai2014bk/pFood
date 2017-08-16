import React, { Component } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";

import { Icon, Button, Footer, FooterTab, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import ScrollableTabView from "react-native-scrollable-tab-view";
import HeaderContent from "./../headerContent/";
import RecommendFood from "./../recomnendFood/";
import Login from "./../login/";
import SignUp from "./../sign-up/";
import Swiper from 'react-native-swiper';
import CustomTabBar from "./CustomTabBar";


import styles from "./styles";

class MainTabFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'recommend'
		};
	}
	selected(tab) {
		this.setState({ selectedTab: tab })
	}
	renderContent() {
		var tab = this.state.selectedTab
		switch (tab) {
			case 'recommend': {
				return (
					<RecommendFood />
				)
			}
			case 'trending': {
				return (
					<SignUp />
				)
			}
			case 'categrories': {
				return (
					<Login />
				)
			}
		}
	}
	render() {
		const navigation = this.props.navigation;
		return (
			<Container>
				<ScrollableTabView locked={true} renderTabBar={() => <CustomTabBar someProp={"here"} />} tabBarPosition={'bottom'} >
					<RecommendFood tabLabel="Recommend" />
					<Login tabLabel="Categrories" />
					<SignUp tabLabel="Trending" />
				</ScrollableTabView>
			</Container>
		);
	}
}

export default MainTabFood;
