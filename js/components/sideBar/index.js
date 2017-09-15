import React, { Component } from "react";
import { Image, TouchableOpacity, View, AsyncStorage } from "react-native";
import * as mConstants from '../../utils/Constants'
import { NavigationActions } from "react-navigation";
import { Container, Content, Text, Icon, ListItem, Thumbnail } from "native-base";
import { Grid, Col } from "react-native-easy-grid";
import { connect } from "react-redux";

import styles from "./style";
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			isLoading: false,
			image: ''
		};
	}

	async componentDidMount() {
		let data = []
		console.log('94kjngjkdf89dl')
		try {
			const value = await AsyncStorage.getItem(mConstants.USER_DETAIL);
			if (value !== null) {
				data = JSON.parse(value)
				console.log('data sideMenu 22321321',data)
				let firstName = data.model.firstName
				let lastName = data.model.lastName
				this.setState({ email:data.model.email })
				if(firstName && lastName) {
					console.log('fffssd')
					this.setState({ firstName, lastName })
				}
			}
		} catch (error) {

		}
	}

	async componentWillReceiveProps(props) {
		console.log('8immj',props)
		if (props.fetchUser.success) {
			console.log('ui2oi1321321')
			let data = []
			try {
				const value = await AsyncStorage.getItem(mConstants.USER_DETAIL);
				if (value !== null) {
					data = JSON.parse(value)
					console.log('data sideMenu 22321321',data)
					let firstName = data.model.firstName
					let lastName = data.model.lastName
					this.setState({ email:data.model.email })
					if(firstName && lastName) {
						console.log('fffssd')						
						this.setState({ firstName, lastName })
					}
				}
			} catch (error) {
	
			}
		}
	}

	async logOut() {
		let keys = [mConstants.CART, mConstants.USER_INFO, mConstants.USER_DETAIL];
		await AsyncStorage.multiRemove(keys)
		this.props.navigation.dispatch(resetAction);
	}
	render() {
		let source = ''
		var name = this.state.email
		if (this.state.firstName) {
		 name = this.state.firstName + ' ' + this.state.lastName
		}
		if(this.state.image){
			source = this.state.image
		} else {
			source = 'https://i.imgur.com/GOje06b.png'
		}
		const navigation = this.props.navigation;
		return (
			<Container>
				<Image source={require("../../../images/sid.png")} style={styles.background}>
					<Content style={styles.drawerContent}>
						<ListItem
							navigation={navigation}
							button
							onPress={() => {
								navigation.navigate("MainTabFood");
							}}
							iconLeft
							style={styles.links}
						>
							<Icon style={styles.iconStyle} name="logo-apple" />
							<Text style={styles.linkText}>Thực Phẩm</Text>
						</ListItem>
						<ListItem
							navigation={navigation}
							button
							onPress={() => {
								navigation.navigate("MainTabStore");
							}}
							iconLeft
							style={styles.links}
						>
							<Icon style={styles.iconStyle} name="ios-basket" />
							<Text style={styles.linkText}>Cửa Hàng</Text>
						</ListItem>
						<ListItem
							navigation={navigation}
							button
							onPress={() => {
								navigation.navigate("History");
							}}
							iconLeft
							style={styles.links}
						>
							<Icon style={styles.iconStyle} name="ios-paper" />
							<Text style={styles.linkText}>Lịch Sử</Text>
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
							<Icon style={styles.iconStyle} name="ios-contact" />
							<Text style={styles.linkText}>Thông Tin</Text>
						</ListItem>



						<View style={styles.logoutContainer}>
							<View style={styles.logoutbtn} foregroundColor={"white"}>
								<Grid>
									<Col size={2}>
										<TouchableOpacity
											onPress={() => {
												this.logOut()
											}}
											style={{ alignSelf: "flex-start" }}
										>
											<Text style={{ fontWeight: "bold", color: "#fff" }}>LOG OUT</Text>
											<Text note style={{ color: "#fff" }}>
												{name}
											</Text>
										</TouchableOpacity>
									</Col>
									<Col size={1}>
										<TouchableOpacity
											style={{ alignSelf: "flex-end" }}
											onPress={() => {
												navigation.navigate("Profile");
											}}
										>
											<Thumbnail
												source={{ uri: source}}
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

const mapStateToProps = state => ({
	fetchUser: state.fetchUser
});

export default connect(mapStateToProps)(SideBar);

