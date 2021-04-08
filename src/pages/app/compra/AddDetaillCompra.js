import { Button, Modal } from "rsuite"

export default ({ show, close, newdata }) => {
    return <Modal full open={show} onClose={() => close()}>
        <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <span>
                asfweqkij
            </span>
        </Modal.Body>
        <Modal.Footer>
            <Button appearance="primary">
                Ok
      </Button>
            <Button appearance="subtle">
                Cancel
      </Button>
        </Modal.Footer>
    </Modal>
}