import { StackNavigator } from "react-navigation";

import Main from "./pFood";
import Login from "./components/login/";
import SignUp from "./components/sign-up/";
import ForgetPassword from "./components/forgetPassword"


const LoginStack = StackNavigator(
	{
		Login: { screen: Login },
		ForgetPassword: { screen: ForgetPassword },	
		SignUp : {screen : SignUp},
	},
	{
		index: 0,
		initialRouteName: "Login",
		headerMode: "none",
		navigationOptions: {
			gesturesEnabled: false,
		},
	}
);

export default LoginStack;
