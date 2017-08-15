import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { Text, View } from "native-base";

class CustomTabBar extends Component {
	renderTabOption(name, page) {
		const isTabActive = this.props.activeTab === page;

		return (
			<TouchableOpacity
				key={name}
				onPress={() => this.props.goToPage(page)}
				style={[
					styles.tab,
					{
						borderWidth: isTabActive ? 2 : 0,
						borderColor: isTabActive ? "#FFF" : "transparent",
						borderRadius: isTabActive ? 30 : undefined,
					},
				]}
			>
				<Text style={{ color: "#fff", fontWeight: isTabActive ? "900" : "500" }}>
					{name}
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<View style={styles.tabs}>
				{this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
			</View>
		);
	}
}

const styles = {
	tab: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "transparent",
		paddingVertical: 8,
		marginHorizontal: 5,
	},

	tabs: {
		flexDirection: "row",
		marginVertical: 20,
		marginHorizontal: 10,
		borderWidth: 0,
		borderTopWidth: 0,
		borderLeftWidth: 0,
		borderRightWidth: 0,
	},
};

export default connect()(CustomTabBar);
