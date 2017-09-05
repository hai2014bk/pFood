import { StackNavigator } from "react-navigation";
import React, { Component } from "react";

import Login from "./components/login/";
import NeedHelp from "./components/needhelp";
import SignUp from "./components/sign-up/";
import Walkthrough from "./components/walkthrough/";
import Comments from "./components/comments/";
import Channel from "./components/channel";
import Story from "./components/story";
import MainTabFood from "./components/mainTabFood"
import Drawer from "./Drawer";
import ForgetPassword from "./components/forgetPassword"
import Category from "./components/category";
import RecommendFood from "./components/recomnendFood/";
import FoodDetail from "./components/foodDetail/";
import Trending from "./components/trending"
import Cart from "./components/cart"
import History from "./components/history"
import Store from "./components/store"
import Billing from "./components/billing"
import StoreProduct from "./components/storeProduct"
import StoreInfo from "./components/storeInfo"
import StoreTab from "./components/storeTab";






const App = ({ initialRouteName }) => {
const Main = StackNavigator(
	{
		Drawer: { screen: Drawer, gesturesEnabled: false },
		Login : {screen: Login},
		SignUp: {screen:SignUp},
		ForgetPassword: {screen:ForgetPassword},
		Cart: { screen: Cart },	
		Billing : { screen: Billing },	
	},
	{
		index: 0,
		initialRouteName: initialRouteName,
		headerMode: "none",
		navigationOptions: {
			gesturesEnabled: false,
			drawerLockMode: 'locked-open'
		},
	}
);
 return <Main/>
}

export default App;
