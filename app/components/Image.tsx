import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './Image.css';
import routes from '../constants/routes.json';

import Results from './Results'

import getUrlAsBase64 from '../utils/getUrlAsBase64'

import exportResults from '../utils/exportResults'
import Tag from './Tag'
import services from '../constants/services.json'
import Analysis from './Analysis'
import WordCloud from './WordCloud'

import createQuery from '../utils/serviceConfigurations'
import tagImage from '../utils/tagImage';
import configuration from '../reducers/configuration';
import getFile from '../utils/getFile';



const { remote } = require('electron')

const Listing = ({pathListing, handleDelete}) => {
    const matti = () => {
        console.log('olen matti')
    }
    return (
        <div>
            <ul id='listed-urls'>
                    {pathListing.map((path, index) => <li key={index}>
                            <input type='checkbox' onChange={matti}></input>
                            {path.path}
                            <button className={styles.deleteButton} id="delete" onClick={() => handleDelete(path.path)}>Delete</button>
                    </li>)}
            </ul>
        </div>
    )
}

const Image = (props) => {

    const [imgSource, setImgSource] = useState('')
    const [pathListing, setPathListing] = useState([
        { type: 'url', path: 'https://picsum.photos/id/256/200/200.jpg' }
        //{ type: 'localPath', path: 'jalka.jpg' }
    ])
    const [imageURL, setImageURL] = useState('https://picsum.photos/id/256/200/200.jpg')
    const [servicesToSend, setServicesToSend] = useState({})

    const [animation, setAnimation] = useState('')


    const job = props.job
    const setJob = props.setJob

    useEffect(() => {

        const initialServices = {}
        services.forEach((service: object) => initialServices[service.name] = 0)


        setServicesToSend(initialServices)
    }, [])


    const handleJobChange = (services, result) => {

        const serviceNames = Object.keys(services).filter(key => services[key])

        const newJob = {
            sessionJobID: job.sessionJobID + 1,
            services: serviceNames,
            result: result
        }

        setJob(newJob)
    }

    const displayImage = () => {
        // Display image. Currently just displays the first image.
        // Code will probably be used in the future to  display images in the list, maybe on mouseover of path?
        // Doesn't handle local image right now.
        if (pathListing[0].type === 'url') {
            getUrlAsBase64(pathListing[0].path).then((pic: string) => {
                setImgSource('data:image/png;base64,' + pic)
            })
        }

        //display local image
        if (pathListing[0].type === 'localPath') {
            const file = getFile(pathListing[0].path)

            setImgSource('data:image/jpg;base64,' + Buffer.from(file, 'binary').toString('base64'))
        }
    }

    const sendImages = () => {

        setAnimation('processing')


        // Construct queries from configurations of selected services
        const queriesBasedOnConf = Object.keys(servicesToSend)
                            .filter(s => servicesToSend[s])
                            .map(service => props.configuration[service])
                            .map(configuration => pathListing.map(path => createQuery(configuration, path)))
                            .flat()

        const promises = queriesBasedOnConf.map(q => tagImage(q))
    

        Promise.all(promises).then((values: Array<Tag>) => {

            const result = values.flat() // values is a nested array: each service is it's own array
            setAnimation('')
            console.log(result)

            const sortedResult = result.sort((result1, result2) => (result1.accuracy > result2.accuracy) ? -1 : 1)
            

            handleJobChange(servicesToSend, sortedResult)
        })
    }

    const handleAnalyzeClick = () => {
        const serviceArray = Object.keys(servicesToSend).filter(s => servicesToSend[s]).map(s => ` ${s}`)
        if (serviceArray.length < 1) {
            alert("Add at least one service")
        } else {
            if (window.confirm(`You are sending ${pathListing.length} images to${serviceArray}`)) {
                sendImages()
                displayImage()
            }
        }
    }

    const handleClickExport = () => {
        exportResults(job)
    }
    const handleURLchange = (e: Event) => {
        setImageURL(e.target.value)
    }

    const handleClickURL = () => {
        setPathListing(pathListing.concat({ type: 'url', path: imageURL }))
        setImageURL('')
    }

    const handleClickLocal = () => {
        remote.dialog.showOpenDialog({
            properties: ['openFile', 'multiSelections'],
            filters: [
                { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            ]
        }).then(result => {
            let paths = result.filePaths.map(filePath => {
                return {type: 'localPath', path: filePath}
            })
            setPathListing(pathListing.concat(paths))
        }).catch(err => {
            console.log(err)
        })
    }

    const handleSelection = (name: string) => {

        const changedService = { ...servicesToSend }
        changedService[name] = servicesToSend[name] === 1 ? 0 : 1

        setServicesToSend(changedService)
    }

    const handleDelete = (some: string) => {
        const deletedPath = pathListing.filter(p => p.path !== some)
        setPathListing(deletedPath)
    }

    // This could stand to be refactored into separate components
    return (
        <div>
            <div data-tid="backButton">
                <Link to={routes.HOME}>
                    <i className="fa fa-arrow-left fa-3x" />
                </Link>
            </div>
            <Listing pathListing={pathListing} handleDelete={handleDelete}/>
            <h5>URL for image to tag:</h5>
            <input value={imageURL} onChange={handleURLchange} type='text' ></input>
            <button className={styles.button} id="url" onClick={handleClickURL}>Add image URL</button>
            <button className={styles.button} id="url" onClick={handleClickLocal}>Add local images</button>
            <br></br>
            <div>
                <form>
                    {
                        services.map(service => {
                            return (
                                <div key={service.name}>
                                    <label >{service.name}</label>
                                    <input className='isSelected' type='checkbox' onChange={() => handleSelection(service.name)} />
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
            <Results job={job} />
            <br></br>
            <br></br>
            <Analysis job={job} animation={animation} />
            <br></br>
            <br></br>
            <WordCloud job={job} animation={animation} />
        </div>
    )
}


export default Image