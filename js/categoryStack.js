import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Categories from "./components/categories";
import Category from "./components/category";
import SubCategories from "./components/subCategories";
import FoodTab from "./components/foodTab";


const CategoryStack = StackNavigator({
  Categories: {
    screen: Categories,
  },
  Pruduct: {
    screen: Category,
  },
  SubCategories: {
    screen: SubCategories,
  },
  FoodTab: {
    screen: FoodTab,
  },
},
{
		index: 0,
		initialRouteName: "Categories",
		headerMode: "none",
		 navigationOptions: {
      		gesturesEnabled: false,
        },
	}
);

export default CategoryStack;