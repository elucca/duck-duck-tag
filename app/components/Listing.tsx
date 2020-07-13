import React from 'react'
import styles from './Image.css';
import { Table } from 'react-bootstrap'


const Listing = ({ pathListing, handleDelete }) => {

    

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
                                    <td><input type='checkbox' defaultChecked onChange={() => path.selected = !path.selected}></input></td>
                                    <td className="text-light">{path.path}</td>
                                    <td>
                                        <button className={styles.deleteButton} id="delete" onClick={() => handleDelete(path.path)}><span>🗑</span></button>
                                    </td>
                                </tr>
                            )}
                        )
                    }
                </tbody>
            </Table>
        </div>
    )
}


export default Listing