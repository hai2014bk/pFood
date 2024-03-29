import React, { Component } from "react";
import { Image, Platform } from "react-native";
import { Container, Header, Content, Text, Left, Right, Body, Button, Icon, View, Grid, Col } from "native-base";
import ProgressBar from "./../loaders/ProgressBar";

import styles from "./styles";

const headerLogo = require("../../../images/Header-Logo.png");

class Overview extends Component {
	render() {
		const navigation = this.props.navigation;
		return (
			<Container>
				<Image source={require("../../../images/glow2.png")} style={styles.container}>
					<Header>
						<Left>
							<Button transparent style={styles.btnHeader} onPress={() => navigation.goBack()}>
								<Icon active name="arrow-back" />
							</Button>
						</Left>
						<Body>
							<Image source={headerLogo} style={styles.imageHeader} />
						</Body>
						<Right>
							<Button
								transparent
								style={styles.btnHeader}
								onPress={() => navigation.navigate("DrawerOpen")}
							>
								<Icon active name="menu" />
							</Button>
						</Right>
					</Header>
					<View style={styles.overviewHeaderContainer}>
						<Text style={styles.overviewHeader}>OVERVIEW</Text>
						<Text note style={styles.overviewHead}>
							What you are reading the most
						</Text>
					</View>

					<Content showsVerticalScrollIndicator={false}>
						<View style={styles.overviewContent}>
							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>FASHION</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>26%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={34} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>ENVIRONMENT</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>20%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={28} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>TECHNOLOGY</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>15%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={12} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>AUTO</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>12%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={10} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>EDUCATION</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>9%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={8} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>SCIENCE</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>7%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={5} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>SPORTS</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>5%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={3} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>FINANCE</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>3%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={5} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>ART</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>2%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={3} />
							</View>

							<View style={styles.overviewTopicsBox}>
								<Grid style={Platform.OS === "android" ? { paddingBottom: 0 } : { paddingBottom: 15 }}>
									<Col>
										<Text style={styles.overviewInfoHeader}>ANIMATION</Text>
									</Col>
									<Col>
										<Text style={styles.overviewInfoPerc}>1%</Text>
									</Col>
								</Grid>
								<ProgressBar color="#fff" progress={3} />
							</View>
						</View>
					</Content>
				</Image>
			</Container>
		);
	}
}

export default Overview;
