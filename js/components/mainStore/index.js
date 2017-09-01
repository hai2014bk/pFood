import React, { Component } from "react";
import { Text, Image, View, TouchableOpacity } from "react-native";

import { Icon, Button, Footer, FooterTab, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import ScrollableTabView from "react-native-scrollable-tab-view";
import HeaderContent from "./../headerContent/";
import Trending from "./../trending/";
import Categories from "./../categories/";
import Login from "./../login/";
import SignUp from "./../sign-up/";
import Swiper from 'react-native-swiper';
import StoreStack from '../../storeStack';


import styles from "./styles";

class MainTabFood extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'recommend'
		};
	}
	render() {
		const navigation = this.props.navigation;
		return (
			<Container>
				<StoreStack screenProps={{ navi: navigation }} />
			</Container>
		);
	}
}

export default MainTabFood;
