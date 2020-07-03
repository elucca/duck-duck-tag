import React, { useState } from 'react'

import styles from './Image.css';
import { Modal, Button } from 'react-bootstrap'

import exportResults from '../utils/exportResults'

const Export = ({ job })  => {

    const exportFormats = ['CSV','SQLite','JSON']

    const [showExportChoice, setShowExportChoice] = useState(false)
    
    const handleClickExport = () => {
        setShowExportChoice(true) 
    }

    const handleClose = () => setShowExportChoice(false)

    const chooseFormatAndExport = (newFormat) => {
        
        exportResults(job, newFormat )
        setShowExportChoice(false)
        
    }

    const titleStyle = {
        color: "black",
        fontFamily: 'Arial'
    }

    return(
        <div>
            <button className={styles.button} onClick={handleClickExport}>Export tags</button>
                
            <Modal show={showExportChoice} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title style={titleStyle}>Choose export format</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    
                        {
                            exportFormats.map(format =>  <Button variant="primary" key={format} onClick={() => chooseFormatAndExport(format) }>{ format }</Button>)
                        }
                  
                </Modal.Body>
            </Modal >
        </div>
    )

}


export default Export