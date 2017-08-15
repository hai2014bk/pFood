import React, { Component } from "react";
import { Image, View, TouchableOpacity, Dimensions } from "react-native";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { Container, Header, Content, Text, Button, Icon, Card, Left, Body, Right, List, Spinner } from "native-base";

import { Grid, Col } from "react-native-easy-grid";
import Swiper from "react-native-swiper";

import { itemsFetchData } from "../../actions/dataFetch";
import datas from "./data.json";

import styles from "./styles";

const deviceWidth = Dimensions.get("window").width;
const headerLogo = require("../../../images/Header-Logo.png");
const resetAction = NavigationActions.reset({
	index: 0,
	actions: [NavigationActions.navigate({ routeName: "Login" })],
});
class Home extends Component {
	componentDidMount() {
		this.props.fetchData(datas);
	}
	render() {
		if (this.props.isLoading) {
			return <Spinner />;
		} else {
			return (
				<Container style={{ backgroundColor: "#fff" }}>
					<Header>
						<Left>
							<Button
								transparent
								style={styles.btnHeader}
								onPress={() => this.props.navigation.dispatch(resetAction)}
							>
								<Icon active name="power" />
							</Button>
						</Left>
						<Body>
							<Image source={headerLogo} style={styles.imageHeader} />
						</Body>
						<Right>
							<Button
								transparent
								style={styles.btnHeader}
								onPress={() => this.props.navigation.navigate("DrawerOpen")}
							>
								<Icon active name="menu" />
							</Button>
						</Right>
					</Header>

					<Content showsVerticalScrollIndicator={false}>
						<View>
							<View>
								<Swiper
									height={330}
									width={deviceWidth + 3}
									loop
									dot={<View style={styles.swiperDot} />}
									activeDot={<View style={styles.swiperActiveDot} showsButtons />}
								>
									<TouchableOpacity
										activeOpacity={1}
										onPress={() => this.props.navigation.navigate("Story")}
										style={styles.slide}
									>
										<Image
											style={styles.newsPoster}
											source={require("../../../images/NewsIcons/1.jpg")}
										>
											<View style={styles.swiperTextContent}>
												<Text numberOfLines={2} style={styles.newsPosterHeader}>
													Flat App is a style of interface design emphasizing minimal use of
													stylistic elements.
												</Text>
												<Grid style={styles.swiperContentBox}>
													<Col style={{ flexDirection: "row" }}>
														<TouchableOpacity>
															<Text style={styles.newsPosterLink}>SPACE.com</Text>
														</TouchableOpacity>
														<Icon name="ios-time-outline" style={styles.headertimeIcon} />
														<Text style={styles.newsPosterLink}>20m ago</Text>
													</Col>
													<Col>
														<TouchableOpacity style={styles.newsPosterTypeView}>
															<Text style={styles.newsPosterTypeText}>SCIENCE</Text>
														</TouchableOpacity>
													</Col>
												</Grid>
											</View>
										</Image>
									</TouchableOpacity>

									<TouchableOpacity
										activeOpacity={1}
										onPress={() => this.props.navigation.navigate("Story")}
										style={styles.slide}
									>
										<Image
											style={styles.newsPoster}
											source={require("../../../images/NewsIcons/3.jpg")}
										>
											<View style={styles.swiperTextContent}>
												<Text numberOfLines={2} style={styles.newsPosterHeader}>
													So that the applications are able to load faster and resize easily.
												</Text>
												<Grid style={styles.swiperContentBox}>
													<Col style={{ flexDirection: "row" }}>
														<TouchableOpacity>
															<Text style={styles.newsPosterLink}>CDC</Text>
														</TouchableOpacity>
														<Icon name="ios-time-outline" style={styles.headertimeIcon} />
														<Text style={styles.newsPosterLink}>2hr ago</Text>
													</Col>
													<Col>
														<TouchableOpacity style={styles.newsPosterTypeView}>
															<Text style={styles.newsPosterTypeText}>ENVIRONMENT</Text>
														</TouchableOpacity>
													</Col>
												</Grid>
											</View>
										</Image>
									</TouchableOpacity>

									<TouchableOpacity
										activeOpacity={1}
										onPress={() => this.props.navigation.navigate("Story")}
										style={styles.slide}
									>
										<Image
											style={styles.newsPoster}
											source={require("../../../images/NewsIcons/4.jpg")}
										>
											<View style={styles.swiperTextContent}>
												<Text numberOfLines={2} style={styles.newsPosterHeader}>
													But still look sharp on high-definition screens.
												</Text>
												<Grid style={styles.swiperContentBox}>
													<Col style={{ flexDirection: "row" }}>
														<TouchableOpacity>
															<Text style={styles.newsPosterLink}>SKY.com</Text>
														</TouchableOpacity>
														<Icon name="ios-time-outline" style={styles.headertimeIcon} />
														<Text style={styles.newsPosterLink}>1day ago</Text>
													</Col>
													<Col>
														<TouchableOpacity style={styles.newsPosterTypeView}>
															<Text style={styles.newsPosterTypeText}>WORLD</Text>
														</TouchableOpacity>
													</Col>
												</Grid>
											</View>
										</Image>
									</TouchableOpacity>
								</Swiper>
							</View>
						</View>

						<Card style={{ backgroundColor: "#fff", marginTop: 0, marginRight: 0 }}>
							<List
								dataArray={this.props.items}
								renderRow={data =>
									<TouchableOpacity
										style={{ flexDirection: "row" }}
										onPress={() => this.props.navigation.navigate("Story")}
									>
										<View style={styles.newsContent}>
											<Text numberOfLines={2} style={styles.newsHeader}>
												{data.headline}
											</Text>
											<Grid style={styles.swiperContentBox}>
												<Col style={{ flexDirection: "row" }}>
													<TouchableOpacity>
														<Text style={styles.newsLink}>
															{data.link}
														</Text>
													</TouchableOpacity>
													<Icon name="ios-time-outline" style={styles.timeIcon} />
													<Text style={styles.newsLink}>
														{data.time}
													</Text>
												</Col>
												<Col>
													<TouchableOpacity style={styles.newsTypeView}>
														<Text style={styles.newsTypeText}>
															{data.category}
														</Text>
													</TouchableOpacity>
												</Col>
											</Grid>
										</View>
									</TouchableOpacity>}
							/>
						</Card>
					</Content>
				</Container>
			);
		}
	}
}

function bindAction(dispatch) {
	return {
		fetchData: url => dispatch(itemsFetchData(url)),
	};
}

const mapStateToProps = state => ({
	items: state.items,
	hasErrored: state.itemsHasErrored,
	isLoading: state.itemsIsLoading,
});
export default connect(mapStateToProps, bindAction)(Home);
