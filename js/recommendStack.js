import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import RecommendFood from "./components/recomnendFood";
import FoodTab from "./components/foodTab";


const RecommendStack = StackNavigator({
  RecommendFood: {
    screen: RecommendFood,
  },
  FoodTab: {
    screen: FoodTab,
  },
},
{
		index: 0,
		initialRouteName: "RecommendFood",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default RecommendStack;