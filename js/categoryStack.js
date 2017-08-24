import {React} from "react";
import { Animated, Easing } from "react-native";
import { StackNavigator } from 'react-navigation';
import Categories from "./components/categories";
import Category from "./components/category";
import SubCategories from "./components/subCategories";


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