import * as Expo from "expo";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider, Root  } from "native-base";
import * as mConstants from './utils/Constants'
import {
	AsyncStorage
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
			store: configureStore(() => this.setState({ isLoading: false })),
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
			console.log('login 11111', loginInfo)
			if (loginInfo !== null) {
				console.log('login 11111', loginInfo)
				this.setState({ isLogined: true })
			}
		this.setState({ isReady: true });
	}

	render() {
		if (!this.state.isReady) {
			return <Expo.AppLoading />;
		}
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
