import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import services from '../constants/services.json';

import styles from './Image.css';
import { CSVLink, CSVDownload } from 'react-csv'
import routes from '../constants/routes.json';

import getUrlAsBase64 from '../utils/getUrlAsBase64'
import tagImageAzure from '../utils/tagImageAzure'
import tagImageIBM from '../utils/tagImageIbm'
import exportTags from '../utils/exportTags'
import imageTypes from './ImageTypes.ts'


const Image = (props) => {

    const [imgSource, setImgSource] = useState('')
    const [taglist, setTaglist] = useState([])
    const [URLlisting, setURLlisting] = useState(['https://i.picsum.photos/id/256/200/200.jpg'])
    const [imageURL, setImageURL] = useState('https://i.picsum.photos/id/256/200/200.jpg')

    const [animation, setAnimation] = useState('')

    const AzureConfig = props.configuration['Azure']
    const IbmConfig = props.configuration['IBM-watson']


    const handleClickAzure = () => {

        // Display image
        getUrlAsBase64(URLlisting[0]).then((pic: string) => {
            setImgSource('data:image/png;base64,' + pic)
        })

        // Create and run query to Azure
        const azureQuery = tagImageAzure(AzureConfig, URLlisting[0])
        setTaglist([])
        setAnimation('processing')

        azureQuery
            .then((Tags: Array<imageTypes.tag>) => {
                setAnimation('')
                setTaglist(Tags)
            })
            .catch(Error => {
                setAnimation(Error.toString())
            })
    }

    // The above error can be caused for example when the user calls the wrong tagging service.
    // In the future it would be better to ensure that it is only possible to call the correct
    // service with the corresponding credentials.


    const handleClickIBM = () => {

        // Display image
        getUrlAsBase64(URLlisting[0]).then((pic: string) => {
            setImgSource('data:image/png;base64,' + pic)
        })
        // Create and run query to IBM
        const ibmQuery = tagImageIBM(IbmConfig, URLlisting[0])
        setTaglist([])
        setAnimation('processing')

        ibmQuery.then((tags: Array<imageTypes.tag>) => {
            setAnimation('')
            setTaglist(tags.sort((tag1, tag2) => (tag1.accuracy > tag2.accuracy) ? -1 : 1)) // from high accuracy to low
        })
    }

    const handleClickExport = () => {
        console.log(URLlisting)
        exportTags(URLlisting, taglist)
    }

    const handleURLchange = (e: Event) => {
        setImageURL(e.target.value)
    }

    const handleClickURL = () => {
        setURLlisting(URLlisting.concat(imageURL))
        setImageURL('')
    }

    // This could stand to be refactored into separate components
    return (
        <div>
            <div data-tid="backButton">
                <Link to={routes.HOME}>
                    <i className="fa fa-arrow-left fa-3x" />
                </Link>
            </div>
            <ul id='listed-urls'>
                {URLlisting.map((url, index) => <li key={index}>{url}</li>)}
            </ul>
            <h5>URL for image to tag:</h5>
            <input value={imageURL} onChange={handleURLchange} type='text' ></input>
            <button className={styles.button} id="url" onClick={handleClickURL}>Add image URL</button>
            <br></br>
            <br></br>
            <button className={styles.button} id="azure" onClick={handleClickAzure}>Analyze image with Azure</button>
            <button className={styles.button} id="ibm" onClick={handleClickIBM}>Analyze image with IBM</button>
            <br></br>
            <button className={styles.button} id="export" onClick={handleClickExport}>Export tags</button>
            <br></br>
            <div className={styles.imageContainer}>
                {
                    imgSource ? <img src={imgSource}></img> : ''
                }
            </div>
            <div>
                <p>{animation}</p>
            </div>
            <div className={styles.tagListContainer}>
                <ul>
                    {
                        taglist.map((tag: imageTypes.tag) => {
                            return (<li key={tag.label}>{tag.label} (accuracy {Math.floor(tag.accuracy * 10000) / 100} %)</li>)

                        })
                    }
                </ul>
            </div>
        </div>
    )
}


export default Image