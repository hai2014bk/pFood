import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import SearchStore from "./components/searchStore";
import StoreTab from "./components/storeTab";
import FoodTab from "./components/foodTab";
import PurveyorTab from "./components/purveyorTab"

const SearchStoreStack = StackNavigator({
  SearchStore: {
    screen: SearchStore,
  },
  FoodTab: {
    screen: FoodTab,
  },
  StoreTab: {
    screen: StoreTab,
  },
  PurveyorTab:{
    screen: PurveyorTab,
  }
},
{
		index: 0,
		initialRouteName: "SearchStore",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default SearchStoreStack;