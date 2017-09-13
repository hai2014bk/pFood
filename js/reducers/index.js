import { combineReducers } from "redux";

import { items, itemsHasErrored, itemsIsLoading } from "./dataFetch";
import { creatAcount } from "./createAccount";
import { login } from "./login";
import { forgetPassword } from "./forgetPassword"
import { fetchCategories, fetchSubCategories } from "./fetchCategories"
import { fetchProduct } from "./fetchProduct"
import { fetchUser } from "./fetchUser"
import { fetchDetail } from "./fetchDetail"
import { fetchRelate } from "./fetchRelate"
import { fetchTrending } from "./fetchTrending"
import { fetchStores } from "./fetchStores"
import { addOrder } from "./addOrder"
import { reRender } from "./header"
import { fetchStoresDetail, fetchStoreProduct, fetchStoreBanner } from "./fetchStoresDetail"
import { fetchBannerRecomend, fetchTrendingRecomend, fetchLastestRecomend, fetchLowestRecomend } from "./fetchTrendingRecomend"



export default combineReducers({
	items,
	itemsHasErrored,
	itemsIsLoading,
	creatAcount,
	login,
	forgetPassword,
	fetchCategories,
	fetchSubCategories,
	fetchProduct,
	fetchDetail,
	fetchRelate,
	fetchTrending,
	fetchStores,
	addOrder,
	fetchStoresDetail,
	fetchStoreProduct,
	fetchStoreBanner,
	fetchTrendingRecomend,
	fetchLastestRecomend,
	fetchLowestRecomend,
	fetchBannerRecomend,
	reRender,
	fetchUser


});
