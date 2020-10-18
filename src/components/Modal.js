import React from "react";
import propTypes from "prop-types";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({
	showModal,
	handleClose,
	header,
	body,
	onConfirm,
	confirmText,
}) => {
	return (
		<Modal show={showModal} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>{header}</Modal.Title>
			</Modal.Header>
			<Modal.Body style={{ fontSize: "18px" }}>{body}</Modal.Body>
			{confirmText && (
				<Modal.Footer>
					<Button variant="primary" onClick={onConfirm}>
						{confirmText}
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
};

CustomModal.propTypes = {
	showModal: propTypes.bool.isRequired,
	handleClose: propTypes.func.isRequired,
	header: propTypes.string.isRequired,
	body: propTypes.oneOfType([propTypes.string, propTypes.shape({})]).isRequired,
	onConfirm: propTypes.func,
	confirmText: propTypes.string,
};

CustomModal.defaultProps = {
	confirmText: null,
	onConfirm: () => {},
};

export default CustomModal;
