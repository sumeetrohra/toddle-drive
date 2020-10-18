const updateChildrenForDir = (currDir, newChildren, oldData) => {
	return oldData.map((data) => {
		if (data.name === currDir) {
			data.children = newChildren;
			return data;
		} else if (data.type === "directory") {
			return {
				...data,
				children: updateChildrenForDir(currDir, newChildren, data.children),
			};
		} else {
			return data;
		}
	});
};

export default updateChildrenForDir;
