import React, { Component } from "react";
import { Image, View } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import { Container, Header, Left, Body, Right, Button, Icon } from "native-base";

import styles from "./styles";

import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import TabThree from "./tabThree";

import CustomTabBar from "./CustomTabBar";

const headerLogo = require("../../../images/Header-Logo.png");

class Channels extends Component {
	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon active name="arrow-back" />
						</Button>
					</Left>
					<Body>
						<Image source={headerLogo} style={styles.imageHeader} />
					</Body>
					<Right>
						<Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
							<Icon active name="menu" />
						</Button>
					</Right>
				</Header>
				<View style={styles.bgHead}>
					<ScrollableTabView renderTabBar={() => <CustomTabBar someProp={"here"} />}>
						<TabOne tabLabel="Following" navigation={this.props.navigation} />
						<TabTwo tabLabel="Popular" navigation={this.props.navigation} />
						<TabThree tabLabel="Explore" navigation={this.props.navigation} />
					</ScrollableTabView>
				</View>
			</Container>
		);
	}
}

export default Channels;
