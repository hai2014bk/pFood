import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Store from "./components/store";
import StoreTab from "./components/storeTab";
import FoodTab from "./components/foodTab";

const StoreStack = StackNavigator({
  Store: {
    screen: Store,
  },
  FoodTab: {
    screen: FoodTab,
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

export default StoreStack;