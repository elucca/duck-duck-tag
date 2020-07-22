import React from 'react'
import styles from './Image.css';
import { Table } from 'react-bootstrap'

const Listing = ({ pathListing, handleDelete, handleDeleteAll, handleImageSelectionAll, handleImageSelection }) => {

    let deleteAllButton
    if (pathListing.length !== 0) {
        deleteAllButton = <button className={styles.deleteButton} id='deleteAll' onClick={handleDeleteAll}>Delete all</button>
    }

    let selectAllButton
    if (pathListing.length !== 0) {
        let buttonText
        let selectionValue
        if(pathListing.filter(p => p.selected === true).length === pathListing.length) {
            buttonText = 'Unselect all'
            selectionValue = false
        } else {
            buttonText = 'Select all'
            selectionValue = true
        }
    selectAllButton = <button className={styles.button} id='selectAll' onClick={() => handleImageSelectionAll(selectionValue)}>{buttonText}</button>
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
                        <td>{selectAllButton}</td>
                        <td></td>
                        <td>{deleteAllButton}</td>    
                    </tr>
                </tbody>
            </Table>
        </div>
    )
}

export default Listing