import React, { useState, useEffect } from "react";
import styled from "styled-components";

import File from "./File";
import Folder from "./Folder";
import searchDirectories from '../utils/searchDirectories';

const NavigatorContainer = styled.div`
	padding: 20px 20px 0 20px;
	display: grid;
	gridgap: 10px;
	grid-template-columns: repeat(auto-fit, 120px);
`;

const NavigatorWindow = ({ setPath, path, dirData, searchTerm, setSearchTerm }) => {
	const [childNodes, setChildNodes] = useState([]);

	const getChildren = (pathArr) => {
		let nodes = dirData;
		for (let i = 0; i < pathArr.length; i++) {
			const currPath = pathArr[i];
			const currDir = nodes.filter((item) => item.name === currPath);
			nodes = currDir[0].children;
		}
		return nodes;
	};

	useEffect(() => {
		if (!searchTerm) {
			const pathArr = path.split("/");
			const nodes = getChildren(pathArr);
			setChildNodes(nodes);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [path, searchTerm]);

	useEffect(() => {
		if (searchTerm) {
			const foundNodes = searchDirectories(dirData, searchTerm)
			setChildNodes(foundNodes);
		}
	}, [dirData, searchTerm]);

	return (
		<NavigatorContainer>
			{Array.isArray(childNodes) &&
				childNodes.map((item) =>
					item.type === "file" ? (
						<File fileName={item.name} key={item.path} />
					) : (
						<Folder
							folderName={item.name}
							setPath={setPath}
							path={path}
							key={item.path}
							setSearchTerm={setSearchTerm}
							searchTerm={searchTerm}
						/>
					)
				)}
		</NavigatorContainer>
	);
};

export default NavigatorWindow;
