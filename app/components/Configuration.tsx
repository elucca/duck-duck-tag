import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import services from '../constants/services.json';
import styles from './Configuration.css';

type Props = {
    addConfiguration: (object) => void;
}


const Configuration = ( props: Props ) => {

    const [SERVICE, setSERVICE] = useState('')

    useEffect(() => {

        const defaultService = services[0].name
        setSERVICE(defaultService)
        
    },[])

    if (!services) {
        return ''
    }

    const addConfiguration = props.addConfiguration

    const configuration = props.configuration[SERVICE]
  
   

    const handleConfigChange = (e,which) => {
        let alteredConfig
        if (configuration) {
            alteredConfig = { ...configuration }
            alteredConfig[which] = e.target.value ? e.target.value : ''
        } else {
            alteredConfig = { name: SERVICE }
            alteredConfig[which] = e.target.value ? e.target.value : ''
        }
        addConfiguration(alteredConfig)
    }

  
    const displaySecret = (secret) => {
        if (secret) {
            return secret.replace(/./g,'*') 
        }
        return ''
    }

    return(
        <div>
            
            <Link to={routes.HOME}>
                <i className="fa fa-arrow-left fa-3x" />
            </Link>
            <br></br>
            {
                services.map(service => {

                    const style = service.name === SERVICE ? styles.chosenButton :  styles.button

                    return <button key={service.name} className={style}  onClick={() => setSERVICE(service.name)}>{ service.name }</button>
                })
            }
            <h5>Base URL:</h5>
            <input placeholder='Base URL'  onChange={(e) => handleConfigChange(e,'API_URL_BASE')} type='text' ></input>
            <br></br>
            <h5>URL query (added to the end of URL):</h5>
            <input placeholder='URL query'  onChange={(e) => handleConfigChange(e,'API_URL_QUERY')} type='text' ></input>
            
            <br></br>
            <h5>API-key:</h5>
            <input placeholder='API-key'    onChange={(e) => handleConfigChange(e,'API_KEY')} type='password' ></input>
            <br></br>
            <h5>API-endpoint:</h5>
            <input placeholder='API-endpoint'  onChange={(e) => handleConfigChange(e,'API_ENDPOINT')} type='text' ></input>
            <br></br>           
            <div>
                Current config for {SERVICE}:
                <ul>
                    <li>
                        Base URL: { configuration ? configuration.API_URL_BASE : '-' }
                    </li>
                    <li>
                        URL query: { configuration ? configuration.API_URL_QUERY : '-' }
                    </li>
                    <li>
                        API-key: { configuration ? displaySecret(configuration.API_KEY): '-' }
                    </li>
                    <li>
                        API-endpoint: { configuration ? configuration.API_ENDPOINT : '-' }
                    </li>
                </ul>
            </div>
        </div>
        
    )
}

export default Configuration