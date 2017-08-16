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
						borderColor: "gray",
						backgroundColor: isTabActive? 'blue' : 'transparent'
					},
				]}
			>
				<Text style={{ fontSize:15, color: isTabActive? "white":"gray", fontWeight: isTabActive ? "bold" : "normal" }}>
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
	},

	tabs: {
		flexDirection: "row",
		height:50,
		borderTopWidth:1,
		borderColor:'#e7e7e7'
	},
};

export default connect()(CustomTabBar);
