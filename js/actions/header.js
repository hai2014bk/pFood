
export function reRenderHeaderSuccess() {
	return {
		type: "RERENDER_HEADER",
	};
}

export function reRenderHeader() {
	console.log('dfjklmjkdshiu23l3')
	return dispatch => {
		dispatch(reRenderHeader())
	};
}
