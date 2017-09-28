import React, { Component } from "react";
import { BackHandler,Text, Image, View, TouchableOpacity } from "react-native";

import { Icon, Button, Footer, FooterTab, List, ListItem, Header, Container, Content, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import ScrollableTabView from "react-native-scrollable-tab-view";
import HeaderContent from "./../headerContent/";
import RecommendFood from "./../recomnendFood/";
import FoodRelate from "./../foodRelate/";
import Swiper from 'react-native-swiper';
import CustomTabBar from "./CustomTabBar";
import FoodDetail from './../foodDetail';

import styles from "./styles";

class FoodTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'recommend',
			disable:false
		};
	}
	selected(tab) {
		this.setState({ selectedTab: tab })
	}
	disableSwipe(){
		this.setState({disable:true})
	}
	
	render() {
		const navigation = this.props.navigation;
		const { params } = this.props.navigation.state
		console.log(params.parrent)		
		return (
			<Container>
				<HeaderContent navi={this.props.screenProps.navi} leftIcon={'ios-arrow-back'} leftButton={() => navigation.goBack()}
					rightButton={true} title={params.parrent.name}>
				</HeaderContent>
				<ScrollableTabView locked={false} renderTabBar={() => <CustomTabBar someProp={"here"} />} tabBarPosition={'top'} >
					<FoodDetail screenProps={{navi:navigation}} food={params.parrent}   tabLabel="Chi tiết" />
					<FoodRelate screenProps={{navi:navigation}} food={params.parrent}  tabLabel="Liên quan" />
				</ScrollableTabView>
			</Container>
		);
	}
}

export default FoodTab;
