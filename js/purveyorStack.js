import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Store from "./components/store";
import StoreNear from "./components/storeNear";
import StoreTab from "./components/storeTab";
import FoodTab from "./components/foodTab";
import Purveyor from "./components/purveyor";
import PurveyorTab from "./components/purveyorTab";


const PurveyorStack = StackNavigator({
  StoreNear: {
    screen: StoreNear,
  },
  FoodTab: {
    screen: FoodTab,
  },
  StoreTab: {
    screen: StoreTab,
  },
  Purveyor: {
    screen: Purveyor,
  },
  Store: {
    screen: Store,
  },
  PurveyorTab: {
    screen: PurveyorTab,
  },
},
{
		index: 0,
		initialRouteName: "Purveyor",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default PurveyorStack;