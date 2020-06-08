import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Image.css';
import routes from '../constants/routes.json';

import Results from './Results'

import getUrlAsBase64 from '../utils/getUrlAsBase64'
import tagImageAzure from '../utils/tagImageAzure'
import tagImageIBM from '../utils/tagImageIbm'
import exportTags from '../utils/exportTags'
import { imageTypes } from './ImageTypes'
import services from '../constants/services.json'

const Image = (props) => {

    const [imgSource, setImgSource] = useState('')
    const [taglist, setTaglist] = useState([])
    const [URLlisting, setURLlisting] = useState(['https://i.picsum.photos/id/256/200/200.jpg'])
    const [imageURL, setImageURL] = useState('https://i.picsum.photos/id/256/200/200.jpg')
    const [servicesToSend, setServicesToSend] = useState({})

    const [animation, setAnimation] = useState('')

    const AzureConfig = props.configuration['Azure']
    const IbmConfig = props.configuration['IBM']

    const job = props.job
    const setJob = props.setJob

    useEffect(() => {

        let initialServices = {}
        services.forEach((service: object) => initialServices[service.name] = 0 )
        
        
        setServicesToSend(initialServices)
    },[])


    const handleJobChange = (tags) => {

        const newJob = {
            sessionJobID: job.sessionJobID + 1,
            result: tags
        } 
        setJob(newJob)
    }


    const handleAnalyzeClick = () => {

        setTaglist([])
        setAnimation('processing')

        // Display image
        getUrlAsBase64(URLlisting[0]).then((pic: string) => {
            setImgSource('data:image/png;base64,' + pic)
        })

        

        // Create IBM-query
        const ibmQuery = tagImageIBM(IbmConfig, URLlisting[0])
        
        // Create Azure-query
        const azureQuery = tagImageAzure(AzureConfig, URLlisting[0])

        const queryArray = []

        if (servicesToSend["IBM"]) {

            queryArray.push(ibmQuery)
            
        }
        if (servicesToSend["Azure"]){
            queryArray.push(azureQuery)
        }
        
        // Run queries
        Promise.all(queryArray).then((values: Array<imageTypes.tag>) => {

            const tags = values.flat() // values is a nested array: each service is it's own array
            setAnimation('')            

            let sortedTags = tags.sort((tag1, tag2) => (tag1.accuracy > tag2.accuracy) ? -1 : 1)
            setTaglist(sortedTags)
            handleJobChange(sortedTags)
            
        })
    }

    const handleClickExport = () => {
        console.log(URLlisting)
        exportTags(taglist)
    }
    const handleURLchange = (e: Event) => {
        setImageURL(e.target.value)
    }

    const handleClickURL = () => {
        setURLlisting(URLlisting.concat(imageURL))
        setImageURL('')
    }

    const handleSelection = (name: string) => {
        console.log(name, 'name')

        let changedService = { ...servicesToSend  }
        changedService[name] = servicesToSend[name] === 1 ? 0 : 1 

        setServicesToSend(changedService)
        console.log('selected',changedService)
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
            <div>
            <form>
                {
                    services.map(service => {
                        return(
                            <div>
                                <label key={service.name}>{service.name}</label>
                                <input name='isSelected' type='checkbox' onChange={() => handleSelection(service.name)} />
                            </div>
                        )
                    })
                }
            </form>
            </div>
            <br></br>
            <br></br>
            
            <button className={styles.button} id="analyze-button" onClick={handleAnalyzeClick}>Analyze images</button>
          
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
            <Results taglist={taglist} />
        </div>
    )
}


export default Image