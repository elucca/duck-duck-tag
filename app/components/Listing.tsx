import React from 'react'
import styles from './Image.css';
import { Table, Button} from 'react-bootstrap'
import InfoModal from './InfoModal'

const Listing = ({ pathListing, handleDelete, handleDeleteAll, handleImageSelectionAll, handleImageSelection, handleClose, showDeleteAllChoice, pathListingToEmpty }) => {

    let unselectAllButton
    let selectAllButton
    let deleteAllButton
    if (pathListing.length !== 0) {
        deleteAllButton = <Button className={styles.deleteButton} id='deleteAll' onClick={handleDeleteAll}>Delete all</Button>
        selectAllButton = <Button variant="outline-success" id='selectAll' onClick={() => handleImageSelectionAll(true)}>Select all</Button>
        unselectAllButton = <Button variant="outline-secondary" id='unselectAll' onClick={() => handleImageSelectionAll(false)}>Unselect all</Button>
    }
    const modalTitle = 'Art thou certain thou wishest to discard all images?'
    const modalBody = 
        <div>
            <Button variant="primary" onClick={pathListingToEmpty}>aye</Button>
            <Button variant="secondary" onClick={handleClose}>nay</Button>
        </div>

    return (
        <div>
            <Table striped className={styles.listedURLS}>
                <thead>
                    <tr>
                        <th className="text-light">Send to service</th>
                        <th className="text-light">Path/url</th>
                        <th className="text-light">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    pathListing.map((path) => 
                            {
                            return(
                                // TODO: add id to key and handleDelete
                                <tr key={path.path}>
                                    <td><input type='checkbox' checked={path.selected} onChange={() => handleImageSelection(path.path)}></input></td>
                                    <td className="text-light">{path.path}</td>
                                    <td>
                                        <Button className={styles.deleteButton} id="delete" onClick={() => handleDelete(path.path)}><span>🗑</span></Button>
                                    </td>
                                </tr>
                            )}
                        )
                    }
                    <tr>
                        <td>{selectAllButton}{unselectAllButton}</td>
                        <td></td>
                        <td>{deleteAllButton}</td>  
                        <InfoModal show={showDeleteAllChoice} hide={handleClose} title={modalTitle} body={modalBody}/> 
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Listing