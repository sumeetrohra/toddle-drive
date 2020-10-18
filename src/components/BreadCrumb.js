import React from "react";
import styled from "styled-components";
import { HiArrowCircleUp } from "react-icons/hi";

import uuidv4 from "../utils/uuidv4";

const BreadCrumbDiv = styled.div`
	height: 60px;
	width: 100%;
	border-bottom: 1px solid lightGrey;
	display: flex;
	justify-content: space-between;
	align-items: center;
	color: grey;
`;

const ArrowUpImg = styled(HiArrowCircleUp)`
	width: 30px;
	height: 30px;
	margin-right: 10px;

	:hover {
		cursor: pointer;
		color: black;
	}
`;

const SearchInput = styled.input`
	border: 1px solid lightgrey;
	border-radius: 5px;
	color: grey;
	cursor: pointer;
	padding: 2px 10px;
`;

const CrumbOption = styled.span`
	cursor: pointer;
`;

const BreadCrumb = ({ dirData, setPath, path, searchTerm, setSearchTerm }) => {
	const crumbs = path.split("/");
	const pathLength = crumbs.length;

	const handleSetPath = (crumb) => {
		const index = crumbs.indexOf(crumb);
		const newPath = crumbs.slice(0, index + 1).join("/");
		setPath(newPath);
	};

	const handleBack = () => {
		if (pathLength > 1) {
			const newPath = crumbs.slice(0, pathLength - 1).join("/");
			setPath(newPath);
		}
	};

	const renderPath = () => (
		<div>
			<ArrowUpImg alt="back" onClick={handleBack} />
			{crumbs.map((item, index) => {
				return (
					<span key={uuidv4()}>
						<CrumbOption
							style={{
								color: index === pathLength - 1 && "black",
								textDecorationColor: "rgba(0,0,0,0.1)",
								textDecoration: index !== pathLength - 1 && "underline",
							}}
							onClick={() => handleSetPath(item)}>
							{item}
						</CrumbOption>
						<span> {index !== pathLength - 1 && "/"} </span>
					</span>
				);
			})}
		</div>
	);

	const renderSearch = () => (
		<SearchInput
			placeholder="search"
			value={searchTerm}
			onChange={(event) => setSearchTerm(event.target.value)}
		/>
	);

	const renderSearchText = () => <span>Searching for term: {searchTerm}</span>;

	return (
		<BreadCrumbDiv>
			{!searchTerm ? renderPath() : renderSearchText()}
			{renderSearch()}
		</BreadCrumbDiv>
	);
};

export default BreadCrumb;
