export default (dirData, term) => {
	console.log("here");
	let results = [];
	const regex = new RegExp(term);

	// searching code here
	const findElements = (dirObj) => {
		dirObj.forEach((item) => {
			if (regex.test(item.name)) {
				results.push({
					name: item.name,
					path: item.path,
					type: item.type,
				});
			}

			if (
				item.type === "directory" &&
				Array.isArray(item.children) &&
				item.children.length > 0
			) {
				findElements(item.children);
			}
		});
	};

	findElements(dirData);

	return results;
};
