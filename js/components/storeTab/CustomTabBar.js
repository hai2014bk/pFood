import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import { connect } from "react-redux";

import { Icon,Text, View } from "native-base";
const primary = require("../../themes/variable").brandPrimary;

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
						borderColor: isTabActive? primary: "gray",
						borderBottomWidth: isTabActive ? 3:0
					},
				]}
			>
				<Text style={{ fontSize:13, color:isTabActive? primary: 'gray'}}>
					{name}
				</Text>
			</TouchableOpacity>
		);
	}

	render() {
		console.log('2212112',this.props.tabs)
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
		backgroundColor: "white",
	},

	tabs: {
		flexDirection: "row",
		height:40,
		borderTopWidth:1,
		borderColor:'#e7e7e7'
	},
};

export default connect()(CustomTabBar);
