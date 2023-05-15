import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function ErrorPopup({ onClose }) {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate("/");
  };

  return (
    <Modal className="modal" show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>No access</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>You need to login to access the service</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
