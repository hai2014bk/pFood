import React, { Component } from "react";
import { Image, View } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";

import { Container, Header, Text, Input, Button, Icon, Body, Item } from "native-base";

import styles from "./style";

import CustomTabBar from "../channels/CustomTabBar";
import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import TabThree from "./tabThree";

class Comments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			offset: {
				x: 0,
				y: 0,
			},
		};
	}

	render() {
		return (
			<Container>
				<Image source={require("../../../images/glow2.png")} style={styles.container}>
					<Header>
						<Body style={{ flexDirection: "row", justifyContent: "space-around" }}>
							<Button transparent onPress={() => this.props.navigation.goBack()}>
								<Icon active name="arrow-back" style={styles.headerIcons} />
							</Button>
							<Button transparent>
								<Icon name="chatboxes" style={styles.headerIcons} />
							</Button>
							<Button transparent>
								<Text style={styles.headerTextIcon}>Aa</Text>
							</Button>
							<Button transparent>
								<Icon name="bookmarks" style={styles.headerIcons} />
							</Button>
							<Button transparent>
								<Icon name="download" style={styles.headerIcons} />
							</Button>
						</Body>
					</Header>

					<View style={styles.commentHeadbg}>
						<Text style={styles.commentHeader}>23 COMMENTS</Text>
						<ScrollableTabView renderTabBar={() => <CustomTabBar someProp={"here"} />}>
							<TabOne tabLabel="Best" />
							<TabTwo tabLabel="Newest" />
							<TabThree tabLabel="Oldest" />
						</ScrollableTabView>
					</View>

					<View style={styles.commentBox}>
						<Item>
							<Icon name="ios-attach" style={styles.attachIcon} />
							<Input
								placeholder="Write something..."
								placeholderTextColor="#797979"
								style={styles.input}
							/>
							<Icon name="ios-arrow-forward" style={styles.arrowForwardIcon} />
						</Item>
					</View>
				</Image>
			</Container>
		);
	}
}

export default Comments;
