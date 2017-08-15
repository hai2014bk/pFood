import React, { Component } from "react";
import { Platform, Dimensions, StatusBar } from "react-native";
import { Container, Content, Text, Button, Icon, View } from "native-base";
import Swiper from "react-native-swiper";

import styles from "./styles";
import commonColor from "../../../native-base-theme/variables/commonColor";

const deviceWidth = Dimensions.get("window").width;
class Walkthrough extends Component {
	render() {
		return (
			<Container>
				<StatusBar backgroundColor={commonColor.statusBarColor} barStyle="light-content" />
				<Content>
					<Swiper
						loop={false}
						width={deviceWidth + 3}
						dot={<View style={styles.swiperDot} />}
						activeDot={<View style={styles.swiperActiveDot} />}
					>
						<View style={styles.slides}>
							<Text style={Platform.OS === "android" ? styles.apaginationText : styles.iospaginationText}>
								1 of 3
							</Text>
							<Icon name="ios-paper-outline" style={styles.imageIcons} />
							<Text numberOfLines={2} style={Platform.OS === "android" ? styles.aText : styles.iosText}>
								Explore the latest news from your mobile device
							</Text>
							<Button
								transparent
								rounded
								onPress={() => this.props.navigation.navigate("Drawer")}
								style={styles.Button}
							>
								<Text style={{ color: "#FFF", fontWeight: "600" }}>Skip To App</Text>
							</Button>
						</View>

						<View style={styles.slides}>
							<Text style={Platform.OS === "android" ? styles.apaginationText : styles.iospaginationText}>
								2 of 3
							</Text>
							<Icon name="ios-information-circle-outline" style={styles.imageIcons} />
							<Text numberOfLines={2} style={Platform.OS === "android" ? styles.aText : styles.iosText}>
								Get News Feed of variuos domains at one place
							</Text>
							<Button
								transparent
								rounded
								onPress={() => this.props.navigation.navigate("Drawer")}
								style={styles.Button}
							>
								<Text style={{ color: "#FFF", fontWeight: "600" }}>Skip To App</Text>
							</Button>
						</View>

						<View style={styles.slides}>
							<Text style={Platform.OS === "android" ? styles.apaginationText : styles.iospaginationText}>
								3 of 3
							</Text>
							<Icon name="ios-volume-up-outline" style={styles.imageIcons} />
							<Text numberOfLines={2} style={Platform.OS === "android" ? styles.aText : styles.iosText}>
								Get going with the React Native Flat App Theme
							</Text>
							<Button
								transparent
								rounded
								onPress={() => this.props.navigation.navigate("Drawer")}
								style={styles.Button}
							>
								<Text style={{ color: "#FFF", fontWeight: "600" }}>Continue To App</Text>
							</Button>
						</View>
					</Swiper>
				</Content>
			</Container>
		);
	}
}

export default Walkthrough;
