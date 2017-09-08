
export function reRenderHeaderSuccess() {
	return {
		type: "RERENDER_HEADER",
	};
}

export function reRenderHeader() {
	console.log('fbvdffsas')
	return dispatch => {
		dispatch(reRenderHeaderSuccess())
	};
}
