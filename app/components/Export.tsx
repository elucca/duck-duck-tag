import React, { useState } from 'react'

import styles from './Image.css';
import { Button } from 'react-bootstrap'
import InfoModal from './InfoModal'
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

    const modalTitle = 'Bitte wählen Sie das Exportformat'
    const modalbody =
        <div>
            {
                exportFormats.map(format =>  <Button variant="primary" key={format} onClick={() => chooseFormatAndExport(format) }>{ format }</Button>)
            }
        </div>

    return(
        <div>
            <button className={styles.button} onClick={handleClickExport}>Export tags</button>
                
            <InfoModal show={showExportChoice} hide={handleClose} title={modalTitle} body={modalbody}/>
        </div>
    )

}


export default Export