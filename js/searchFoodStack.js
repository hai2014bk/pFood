import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Categories from "./components/categories";
import Category from "./components/category";
import SearchFood from "./components/searchFood";
import FoodTab from "./components/foodTab";


const SearchFoodStack = StackNavigator({
  FoodTab: {
    screen: FoodTab,
  },
  SearchFood: {
    screen: SearchFood,
  },
},
{
		index: 0,
		initialRouteName: "SearchFood",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default SearchFoodStack;