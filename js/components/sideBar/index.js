import React, { Component } from "react";
import { Image, TouchableOpacity, View, AsyncStorage } from "react-native";
import * as mConstants from '../../utils/Constants'
import { NavigationActions } from "react-navigation";
import { Container, Content, Text, Icon, ListItem, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";

import styles from "./style";
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
class SideBar extends Component {

	async logOut() {
		let keys = [mConstants.CART, mConstants.USER_INFO];
		await AsyncStorage.multiRemove(keys)
		this.props.navigation.dispatch(resetAction);
	}
	render() {
		const navigation = this.props.navigation;
		return (
			<Container>
				<Image source={require("../../../images/sid.png")} style={styles.background}>
					<Content style={styles.drawerContent}>
						<ListItem
							navigation={navigation}
							button
							onPress={() => {
								navigation.navigate("Store");
							}}
							iconLeft
							style={styles.links}
						>
							<Icon name="ios-basket" />
							<Text style={styles.linkText}>Cửa Hàng</Text>
						</ListItem>
						<ListItem
							navigation={navigation}
							button
							onPress={() => {
								navigation.navigate("Store");
							}}
							iconLeft
							style={styles.links}
						>
							<Icon name="ios-paper" />
							<Text style={styles.linkText}>Lịch Sử</Text>
						</ListItem>
						<ListItem
							navigation={navigation}
							button
							onPress={() => {
								navigation.navigate("Overview");
							}}
							iconLeft
							style={styles.links}
						>
							<Icon name="ios-stats" />
							<Text style={styles.linkText}> OVERVIEW</Text>
						</ListItem>
						<ListItem
							navigation={navigation}
							button
							onPress={() => {
								navigation.navigate("Profile");
							}}
							iconLeft
							style={styles.links}
						>
							<Icon name="ios-contact" />
							<Text style={styles.linkText}> Thông Tin</Text>
						</ListItem>



						<View style={styles.logoutContainer}>
							<View style={styles.logoutbtn} foregroundColor={"white"}>
								<Grid>
									<Col>
										<TouchableOpacity
											onPress={() => {
												this.logOut()
											}}
											style={{ alignSelf: "flex-start" }}
										>
											<Text style={{ fontWeight: "bold", color: "#fff" }}>LOG OUT</Text>
											<Text note style={{ color: "#fff" }}>
												Kumar Sanket
											</Text>
										</TouchableOpacity>
									</Col>
									<Col>
										<TouchableOpacity
											style={{ alignSelf: "flex-end" }}
											onPress={() => {
												navigation.navigate("Profile");
											}}
										>
											<Thumbnail
												source={require("../../../images/contacts/sanket.png")}
												style={styles.profilePic}
											/>
										</TouchableOpacity>
									</Col>
								</Grid>
							</View>
						</View>
					</Content>
				</Image>
			</Container>
		);
	}
}

export default SideBar;
