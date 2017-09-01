import React from "react";
import { DrawerNavigator } from "react-navigation";

import Home from "./components/home/";
import Channels from "./components/channels";
import SideBar from "./components/sideBar";
import Overview from "./components/overview";
import Calendar from "./components/calendar/";
import Timeline from "./components/timeline";
import Feedback from "./components/feedback/";
import Profile from "./components/profile/";
import Settings from "./components/settings";
import Widgets from "./components/widgets";
import MainTabFood from "./components/mainTabFood";
import MainStore from "./components/mainStore";

import History from "./components/history"
import Store from "./components/store"
import StoreStack from "./storeStack"

const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
		Channels: { screen: Channels },
		Overview: { screen: Overview },
		Calendar: { screen: Calendar },
		Timeline: { screen: Timeline },
		Feedback: { screen: Feedback },
		Profile: { screen: Profile },
		Settings: { screen: Settings },
		Widgets: { screen: Widgets },
		History: { screen: History },	
		MainStore : { screen: MainStore },
		MainTabFood: {screen: MainTabFood},
		
	},
	{
		initialRouteName: "MainTabFood",
		contentComponent: props => <SideBar {...props} />,
	}
);

export default Drawer;
