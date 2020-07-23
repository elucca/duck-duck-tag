import React from 'react'
import styles from './Image.css';
import { Table, Button } from 'react-bootstrap'

const Listing = ({ pathListing, handleDelete, handleDeleteAll, handleImageSelectionAll, handleImageSelection }) => {

    let unselectAllButton
    let selectAllButton
    let deleteAllButton
    if (pathListing.length !== 0) {
        deleteAllButton = <Button className={styles.deleteButton} id='deleteAll' onClick={handleDeleteAll}>Delete all</Button>
        selectAllButton = <Button variant="outline-success" id='selectAll' onClick={() => handleImageSelectionAll(true)}>Select all</Button>
        unselectAllButton = <Button variant="outline-secondary" id='unselectAll' onClick={() => handleImageSelectionAll(false)}>Unselect all</Button>
    }


   


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
                                        <button className={styles.deleteButton} id="delete" onClick={() => handleDelete(path.path)}><span>🗑</span></button>
                                    </td>
                                </tr>
                            )}
                        )
                    }
                    <tr>
                        <td>{selectAllButton}{unselectAllButton}</td>
                        <td></td>
                        <td>{deleteAllButton}</td>    
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Listing