import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Trending from "./components/trending";
import FoodTab from "./components/foodTab";


const TrendingStack = StackNavigator({
  Trending: {
    screen: Trending,
  },
  FoodTab: {
    screen: FoodTab,
  },
},
{
		index: 0,
		initialRouteName: "Trending",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default TrendingStack;