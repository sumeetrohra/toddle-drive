import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ToggleButtonGroup, Button, Form } from "react-bootstrap";

import File from "./File";
import Folder from "./Folder";
import Modal from "./Modal";
import ContextMenu from "./ContextMenu";
import searchDirectories from "../utils/searchDirectories";
import AddNewButton from "../assets/add_new_button.png";
import updateChildrenForDir from "../utils/updateChildrenForDir";
import uuidv4 from "../utils/uuidv4";

const PageContainer = styled.div`
	height: 90vh;
`;

const NavigatorContainer = styled.div`
	padding: 20px 20px 0 20px;
	display: grid;
	gridgap: 10px;
	grid-template-columns: repeat(auto-fit, 120px);
`;

const AddImage = styled.img`
	width: 70px;
	margin: 10px;
	cursor: pointer;
`;

const ButtonGroupDiv = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	alig-items: center;
`;

const GridContainer = styled.div`
	display: grid;
	grid-template-columns: auto;
	grid-gap: 10px;
	padding: 0 20px;
`;

const NavigatorWindow = ({
	setPath,
	path,
	dirData,
	searchTerm,
	setSearchTerm,
	setDirData,
}) => {
	const FILE = "file";
	const FOLDER = "directory";

	const [childNodes, setChildNodes] = useState([]);
	const [showAddModal, setShowAddModal] = useState(false);
	const [addNodeType, setAddNodeType] = useState(FILE);
	const [nodeName, setNodeName] = useState("");
	const [renameNode, setRenameNode] = useState();
	const [copiedNode, setCopiedNode] = useState();

	console.log(copiedNode);

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
	}, [path, searchTerm, dirData]);

	useEffect(() => {
		if (searchTerm) {
			const foundNodes = searchDirectories(dirData, searchTerm);
			setChildNodes(foundNodes);
		}
	}, [dirData, searchTerm]);

	const addModalBody = () => {
		return (
			<GridContainer>
				<ButtonGroupDiv>
					<ToggleButtonGroup type="checkbox" size="sm">
						<Button
							disabled={!!renameNode}
							variant={addNodeType === FILE ? "primary" : "light"}
							value={FILE}
							onClick={() => setAddNodeType(FILE)}>
							File
						</Button>
						<Button
							disabled={!!renameNode}
							variant={addNodeType === FOLDER ? "primary" : "light"}
							value={FOLDER}
							onClick={() => setAddNodeType(FOLDER)}>
							Folder
						</Button>
					</ToggleButtonGroup>
				</ButtonGroupDiv>
				<Form>
					<Form.Control
						type="text"
						placeholder="name"
						value={nodeName}
						onChange={(event) => setNodeName(event.target.value)}
					/>
				</Form>
			</GridContainer>
		);
	};

	const handleModalClose = () => {
		setAddNodeType(FILE);
		setShowAddModal(false);
		setNodeName("");
		setRenameNode();
	};

	const handleAddNode = () => {
		const pathArr = path.split("/");

		if (nodeName) {
			const oldChildren = getChildren(pathArr) || [];
			const newChild = {
				path: path + "/" + nodeName,
				type: addNodeType,
				name: nodeName,
				children: addNodeType === FOLDER && [],
			};
			let newChildren = [...oldChildren, newChild];

			const currDir = pathArr[pathArr.length - 1];
			const oldData = JSON.parse(JSON.stringify(dirData));
			const newData = updateChildrenForDir(currDir, newChildren, oldData);
			setDirData(() => newData);
			handleModalClose();
		}
	};

	const handleDelete = (item) => {
		const pathArr = path.split("/");
		const oldChildren = getChildren(pathArr) || [];
		const newChildren = oldChildren.filter((node) => node.name !== item.name);

		const currDir = pathArr[pathArr.length - 1];
		const oldData = JSON.parse(JSON.stringify(dirData));
		const newData = updateChildrenForDir(currDir, newChildren, oldData);
		setDirData(newData);
	};

	const handleRenameNode = () => {
		const item = renameNode;
		const pathArr = path.split("/");
		if (nodeName) {
			const oldChildren = getChildren(pathArr) || [];
			const newChildren = oldChildren.map((node) => {
				console.log(node);
				if (item.name === node.name) {
					const nodePath =
						node.path
							.split("/")
							.slice(0, node.path.length - 1)
							.join("/") +
						"/" +
						nodeName;
					return {
						path: nodePath,
						name: nodeName,
						type: node.type,
						children: node.children,
					};
				}
				return node;
			});

			const currDir = pathArr[pathArr.length - 1];
			const oldData = JSON.parse(JSON.stringify(dirData));
			const newData = updateChildrenForDir(currDir, newChildren, oldData);
			setDirData(() => newData);
			handleModalClose();
		}
	};

	const openRenameModal = (item) => {
		setRenameNode(item);
		setNodeName(item.name);
		setAddNodeType(item.type === "directory" ? FOLDER : FILE);
		setShowAddModal(true);
	};

	const handlePaste = () => {
		if (copiedNode) {
			const newChild = {
				type: copiedNode.type,
				name: copiedNode.name,
				children: copiedNode.children,
				path: path + "/" + copiedNode.name,
			};

			const pathArr = path.split("/");
			const oldChildren = getChildren(pathArr) || [];
			let newChildren = [...oldChildren, newChild];

			const currDir = pathArr[pathArr.length - 1];
			const oldData = JSON.parse(JSON.stringify(dirData));
			console.log(Array.isArray(oldData));
			const newData = updateChildrenForDir(currDir, newChildren, oldData);
			setDirData(() => newData);
			setCopiedNode();
		}
	};

	return (
		<ContextMenu
			id="nav-window"
			copiedNode={copiedNode}
			onPasteClick={handlePaste}>
			<PageContainer>
				<NavigatorContainer>
					{Array.isArray(childNodes) &&
						childNodes.map((item) =>
							item.type === "file" ? (
								<ContextMenu
									id={item.path}
									onCopyClick={() => setCopiedNode(item)}
									onRenameClick={() => openRenameModal(item)}
									onClickDelete={() => handleDelete(item)}
									key={uuidv4()}>
									<File fileName={item.name} />
								</ContextMenu>
							) : (
								<ContextMenu
									id={item.path}
									key={uuidv4()}
									onCopyClick={() => setCopiedNode(item)}
									onRenameClick={() => openRenameModal(item)}
									onClickDelete={() => handleDelete(item)}>
									<Folder
										folderName={item.name}
										setPath={setPath}
										path={path}
										setSearchTerm={setSearchTerm}
										searchTerm={searchTerm}
									/>
								</ContextMenu>
							)
						)}
					<AddImage
						src={AddNewButton}
						alt="add file or folder"
						onClick={() => setShowAddModal(true)}
					/>
					<Modal
						showModal={showAddModal}
						handleClose={handleModalClose}
						header={renameNode ? "Edit name" : "Create new"}
						confirmText={renameNode ? "Save changes" : "Create"}
						body={addModalBody()}
						onConfirm={() =>
							renameNode ? handleRenameNode() : handleAddNode()
						}
					/>
				</NavigatorContainer>
			</PageContainer>
		</ContextMenu>
	);
};

export default NavigatorWindow;
