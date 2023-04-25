import { Button, Modal } from "react-bootstrap";

export function ConfirmationModal({ sentance }) {
  return (
    <Modal className="modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Registration status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{sentance}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
