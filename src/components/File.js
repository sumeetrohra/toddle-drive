import React from "react";
import styled from "styled-components";

import FileImage from "../assets/file.png";

const FileDiv = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
  font-size: 16px !important;
  cursor: pointer;
  padding: 10px;
  border-radius: 10px;

  &:hover {
    background-color: rgba(0,0,0,0.05);
  }
`;

const ImageDiv = styled.div`
	position: relative;
`;

const FileExt = styled.p`
	margin: 0;
	font-size: 14px;
	bottom: 5px;
	left: 5px;
	position: absolute;
	color: white;
`;

const File = ({ fileName }) => {
	const ext = fileName.split(".").pop();

	return (
		<FileDiv>
			<ImageDiv>
				<img src={FileImage} alt="file" />
				<FileExt>.{ext}</FileExt>
			</ImageDiv>
			<p>{fileName}</p>
		</FileDiv>
	);
};

export default File;
