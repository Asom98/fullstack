import { Button, Modal } from "react-bootstrap";

export function ErrorPopup({ onClose }) {
  return (
    <Modal className="modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>No access</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You need to login to access the service</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
