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
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <SideBar {...props} />,
	}
);

export default Drawer;
