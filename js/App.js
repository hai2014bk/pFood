import { StackNavigator } from "react-navigation";

import Login from "./components/login/";
import NeedHelp from "./components/needhelp";
import SignUp from "./components/sign-up/";
import Walkthrough from "./components/walkthrough/";
import Comments from "./components/comments/";
import Channel from "./components/channel";
import Story from "./components/story";
import RecomendFood from "./components/recomendFood"
import Drawer from "./Drawer";

const App = StackNavigator(
	{
		Login: { screen: Login },
		SignUp: { screen: SignUp },
		NeedHelp: { screen: NeedHelp },
		Walkthrough: { screen: Walkthrough },
		Story: { screen: Story },
		Comments: { screen: Comments },
		Channel: { screen: Channel },
		Drawer: { screen: Drawer },
		RecomendFood: {screen : RecomendFood},
	},
	{
		index: 0,
		initialRouteName: "RecomendFood",
		headerMode: "none",
	}
);

export default App;
