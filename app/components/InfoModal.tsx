import React from 'react'
import { Modal } from 'react-bootstrap'

const InfoModal = ({show, hide, title, body}) => {

    const titleStyle = {
        color: "black",
        fontFamily: 'Arial'
    }

    return(
        <Modal show={show} onHide={hide}>
                <Modal.Header closeButton>
                    <Modal.Title style={titleStyle}>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {body}
                </Modal.Body>

        </Modal>
    )
}

export default InfoModal
