import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import "./react-contextmenu.css";

const Menu = ({
	children,
	onClickDelete,
	onRenameClick,
  onCopyClick,
  onPasteClick,
	copiedNode,
	id,
}) => {
	return (
		<>
			<ContextMenuTrigger id={id}>{children}</ContextMenuTrigger>

			<ContextMenu id={id}>
				{copiedNode && id==="nav-window" ? (
					<MenuItem onClick={onPasteClick}>Paste</MenuItem>
				) : (
					<>
						<MenuItem onClick={onCopyClick}>Copy</MenuItem>
						<MenuItem divider />
						<MenuItem onClick={onRenameClick}>Rename</MenuItem>
						<MenuItem divider />
						<MenuItem onClick={onClickDelete}>Delete</MenuItem>
					</>
				)}
			</ContextMenu>
		</>
	);
};

export default Menu;
