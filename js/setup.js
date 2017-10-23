import * as Expo from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider, Root  } from "native-base";
import * as mConstants from './utils/Constants'
import {
	AsyncStorage,
	BackHandler
  } from "react-native";
import App from "./pFood";
import configureStore from "./configureStore";
import getTheme from "../native-base-theme/components";
import variables from "../native-base-theme/variables/commonColor";

export default class Setup extends Component {
	constructor() {
		super();
		this.state = {
			isLoading: false,
			store: configureStore(),
			isReady: false,
			isLogined: false
		};
	}
	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Helvetica: require("../fonts/HLTr.ttf"),
			Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
		});
		const loginInfo = await AsyncStorage.getItem(mConstants.USER_INFO);
		console.log('login 111112221', loginInfo)
		if (loginInfo !== null) {
			console.log('login 11212111', loginInfo)
			var user = JSON.parse(loginInfo)
			var date = new Date()
			console.log('2138921803213',user.date,date)
			var msPerMinute = 60 * 1000;
			var msPerHour = msPerMinute * 60;
			var msPerDay = msPerHour * 24;				
			var oldDate = new Date(user.date).getTime()
			var nowDate =  date.getTime()
			var elapsed = nowDate - oldDate;				
			var diff =  Math.round(elapsed/msPerHour );   
			if (diff < 24) {
				this.setState({ isLogined: true, isReady:true })					
			} else {
				let keys = [mConstants.CART, mConstants.USER_INFO, mConstants.USER_DETAIL];
				await AsyncStorage.multiRemove(keys)
				this.setState({ isLogined: false, isReady:true })
			}
		} else {
			this.setState({ isLogined: false, isReady:true })
		}
	}

	render() {
		if (!this.state.isReady) {
			return null;
		} else {
		var initialRoute = this.state.isLogined ? "Drawer":"Login"
			return (
				<StyleProvider style={getTheme(variables)}>
					<Provider store={this.state.store}>
						<Root>
							<App initialRouteName={initialRoute} />
						</Root>
					</Provider>
				</StyleProvider>
			);
		}
		
	}
}
