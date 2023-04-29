import { Button, Modal } from "react-bootstrap";

export function BookingModal({ sentance, onClose }) {
  return (
    <Modal className="modal" show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Error</Modal.Title>
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
