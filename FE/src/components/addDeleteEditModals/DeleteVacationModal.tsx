import React from 'react'
import { Button, Modal } from 'react-bootstrap';

type Props = {
    show: boolean;
    handleClose: () => void;
    handleSubmit: (data: any) => void;
}

const DeleteVacationModal = (props: Props) => {
  return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this vacation?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={props.handleSubmit}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
  )
}

export default DeleteVacationModal