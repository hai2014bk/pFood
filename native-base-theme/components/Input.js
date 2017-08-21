import variable from "./../variables/platform";

export default (variables = variable) => {
	const inputTheme = {
		".main": {
			backgroundColor: 'rgba(255,225,240,0.2)',
			borderRadius: 12,
			borderWidth: 0,
			width:'60%',
			color:'white'
		},
		height: variables.inputHeightBase,
		color: variables.inputColor,
		paddingLeft: 5,
		paddingRight: 5,
		flex: 1,
		fontSize: variables.inputFontSize,
		lineHeight: variables.inputLineHeight,
	};

	return inputTheme;
};
