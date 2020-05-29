import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import services from '../constants/services.json';

import styles from './Image.css';

import routes from '../constants/routes.json';

import getUrlAsBase64 from '../utils/getUrlAsBase64'
import tagImageAzure from '../utils/tagImageAzure'
import tagImageIBM from '../utils/tagImageIbm'


declare namespace types {
    interface tag {
        label: string,
        accuracy: number
    }
}



const Image = (props) => {

    const [imgSource, setImgSource] = useState('')
    const [taglist, setTaglist] = useState([])
    const [CREDENTIALS, setCREDENTIALS] = useState({ API_KEY: '' , API_ENDPOINT: '' })
    
    const [imageURL, setImageURL] = useState('https://i.picsum.photos/id/256/200/200.jpg')

    const AzureConfig   = props.configuration['Azure']
    const IbmConfig     = props.configuration['IBM-watson']

    
    const handleClickAzure = () => {
        
        // Display image
        getUrlAsBase64(imageURL).then((pic: String) => {
            setImgSource('data:image/png;base64,' + pic)
        })
        // Create and run query to Azure
        const azureQuery = tagImageAzure( AzureConfig ,imageURL)

        azureQuery.then((tags: Array<types.tag>) => {
            setTaglist(tags)
        })
    }


    const handleClickIBM = () => {
        
        // Display image
        getUrlAsBase64(imageURL).then((pic: String) => {
            setImgSource('data:image/png;base64,' + pic)
        })
        // Create and run query to IBM
        const ibmQuery = tagImageIBM(IbmConfig,imageURL)

        ibmQuery.then((tags: Array<types.tag>) => {
            setTaglist(tags.sort((tag1, tag2) => (tag1.accuracy > tag2.accuracy) ? -1 : 1)) // from high accuracy to low
        })
    }

    const handleURLchange = (e: Event) => {
        setImageURL(e.target.value)
    }



    return(
        <div>
            <div  data-tid="backButton">
                <Link to={routes.HOME}>
                <i className="fa fa-arrow-left fa-3x" />
                </Link>
            </div>
            <h5>URL for image to tag:</h5>
            <input value={imageURL} onChange={handleURLchange} type='text' ></input>
            <br></br>
            <br></br>
            <button className={styles.button} id="azure" onClick={handleClickAzure}>Analyze image with Azure</button>
            <button className={styles.button} id="ibm" onClick={handleClickIBM}>Analyze image with IBM</button>
            <br></br>
            <div className={styles.imageContainer}>
            {
                imgSource ?   <img src={imgSource}></img> : ''
            }
            </div>
            <div className={styles.tagListContainer}>
                <ul>
                        {
                        taglist.map((tag: types.tag) => {
                            return(<li key={tag.label}>{ tag.label } (accuracy {Math.floor(tag.accuracy*10000)/100 } %)</li>)

                        })
                    }
                </ul>
            </div>
        </div>
    )


}


export default Image