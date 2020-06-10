import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Image.css';
import routes from '../constants/routes.json';

import Results from './Results'

import getUrlAsBase64 from '../utils/getUrlAsBase64'

import exportTags from '../utils/exportTags'
import { imageTypes } from './ImageTypes'
import services from '../constants/services.json'
import Analysis from './Analysis'
import WordCloud from './WordCloud'

import getServiceConfigurations from '../utils/serviceConfigurations'
import tagImage from '../utils/tagImage';

const Image = (props) => {

    const [imgSource, setImgSource] = useState('')
    const [taglist, setTaglist] = useState([])
    const [URLlisting, setURLlisting] = useState(['https://i.picsum.photos/id/256/200/200.jpg'])
    const [imageURL, setImageURL] = useState('https://i.picsum.photos/id/256/200/200.jpg')
    const [servicesToSend, setServicesToSend] = useState({})

    const [animation, setAnimation] = useState('')


    const job = props.job
    const setJob = props.setJob

    useEffect(() => {

        let initialServices = {}
        services.forEach((service: object) => initialServices[service.name] = 0 )
        

        setServicesToSend(initialServices)
    },[])


    const handleJobChange = (services, tags) => {

        const serviceNames = Object.keys(services).filter(key => services[key])

        const newJob = {
            sessionJobID: job.sessionJobID + 1,
            services: serviceNames,
            result: tags
        }

        setJob(newJob)
    }

    const sendImages = () => {
        setTaglist([])
        setAnimation('processing')

        // Display image
        getUrlAsBase64(URLlisting[0]).then((pic: string) => {
            setImgSource('data:image/png;base64,' + pic)
        })

        

        // 1. Get configurations for services (= found in props.configurations)
        const serviceConfigurations = getServiceConfigurations().map(service =>  {
            const conf =  props.configuration[service.getName()] 
            if (conf) {
                service.updateConfiguration(conf)
                return service
            }
        })

        const queries = serviceConfigurations.map(conf => {
            return( URLlisting.map(URL => tagImage(conf, URL) ) ) 
        })
        
        

        Promise.all(queries.flat()).then((values: Array<imageTypes.tag>) => {

            const tags = values.flat() // values is a nested array: each service is it's own array
            setAnimation('')            

            let sortedTags = tags.sort((tag1, tag2) => (tag1.accuracy > tag2.accuracy) ? -1 : 1)
            setTaglist(sortedTags)

            handleJobChange(servicesToSend, sortedTags)
            
            
        })
    }

    const handleAnalyzeClick = () => {
        const serviceArray = Object.keys(servicesToSend).filter(s => servicesToSend[s]).map(s => ` ${s}`)
        if (serviceArray.length <  1) {
            alert("Add at least one service")
        } else {
         if (window.confirm(`You are sending ${URLlisting.length} images to${serviceArray}`)) {
            sendImages()
         }
        }
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

        let changedService = { ...servicesToSend  }
        changedService[name] = servicesToSend[name] === 1 ? 0 : 1 

        setServicesToSend(changedService)
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
                            <div key={service.name}>
                                <label >{service.name}</label>
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
            <br></br>
            <br></br>
            <Analysis job={job} animation={animation} />
            <br></br>
            <WordCloud job={job} animation={animation} />
        </div>
    )
}


export default Image