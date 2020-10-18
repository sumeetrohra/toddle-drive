import React from "react";
import styled from "styled-components";

import FolderImage from "../assets/folder.png";

const FolderDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 16px !important;
	cursor: pointer;
	padding: 10px;
	border-radius: 10px;

	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
`;

const P = styled.p`
	text-align: center;
`;

const Folder = ({ folderName, setPath, path, setSearchTerm, searchTerm }) => {
	const handleSetPath = () => {
		if (searchTerm) {
			setPath(path);
			setSearchTerm();
		} else {
			const newPath = path + "/" + folderName;
			setPath(newPath);
		}
	};

	// to handle double click
	let clicks = [];
	let timeout;

	const handleClick = (event) => {
		event.preventDefault();
		clicks.push(new Date().getTime());
		window.clearTimeout(timeout);
		timeout = window.setTimeout(() => {
			if (
				clicks.length >= 1 &&
				clicks[clicks.length - 1] - clicks[clicks.length - 2] <= 300
			) {
				handleSetPath();
				clicks = [];
			} else {
				clicks = [];
			}
		}, 250);
	};

	return (
		<FolderDiv onClick={handleClick}>
			<img src={FolderImage} alt="Folder" />
			<P>{folderName}</P>
		</FolderDiv>
	);
};

export default Folder;
