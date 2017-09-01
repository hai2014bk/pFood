import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Store from "./components/store";
import StoreTab from "./components/storeTab";


const TrendingStack = StackNavigator({
  Store: {
    screen: Store,
  },
  StoreTab: {
    screen: StoreTab,
  },
},
{
		index: 0,
		initialRouteName: "Store",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default TrendingStack;