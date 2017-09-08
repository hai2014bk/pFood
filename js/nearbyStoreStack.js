import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Store from "./components/store";
import StoreNear from "./components/storeNear";
import StoreTab from "./components/storeTab";
import FoodTab from "./components/foodTab";

const NearbyStoreStack = StackNavigator({
  StoreNear: {
    screen: StoreNear,
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
		initialRouteName: "StoreNear",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default NearbyStoreStack;