import { StackNavigator } from "react-navigation";

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
import LoginStack from "./loginStack"


const Main = StackNavigator(
	{
		Drawer: { screen: Drawer, gesturesEnabled: false },
		Cart: { screen: Cart },
		LoginStack: { screen: LoginStack },		
		
	},
	{
		index: 0,
		initialRouteName: "Drawer",
		headerMode: "none",
		navigationOptions: {
			gesturesEnabled: false,
		},
	}
);

export default Main;
