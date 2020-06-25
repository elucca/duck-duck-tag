
import axios from 'axios'
import Path from '../components/Path'
import getFile from './getFile'

class ServiceConfiguration {

    name: string
    API_URL_QUERY: string
    API_URL_BASE: string
    API_ENDPOINT: string
    API_KEY: string

    imgPath: Path

    constructor(configuration,path) {
        this.name = configuration.name
        this.API_URL_QUERY = configuration.API_URL_QUERY
        this.API_URL_BASE = configuration.API_URL_BASE
        this.API_ENDPOINT = configuration.API_ENDPOINT
        this.API_KEY = configuration.API_KEY
        this.imgPath = path
    }

    getName = () => {
        return this.name
    }


}

class AzureConfig extends ServiceConfiguration {

    constructor(configuration,path) {
        super(configuration,path)
    }

    getHeaders = () => {
        return {
            headers: {
                'Ocp-Apim-Subscription-Key': this.API_KEY,
                'Content-Type': this.imgPath.type === 'url'  ?  'application/json' : 'application/octet-stream'
            }
        }
    }

    getURL = () => {
        return this.API_ENDPOINT.concat(this.API_URL_QUERY);
    }

    getParams = () => {
        return {
        }
    }

    getBody = () => {
        if (this.imgPath.type === 'url') {
            return { "url": this.imgPath.path }
        }
        if (this.imgPath.type === 'localPath') {
            const file = getFile(this.imgPath.path)
            return file
        }
   
    }

    getHandleResponse = () => {

        const manipulateTag = (tag) => (
            {
                imgPath: this.imgPath,
                service: this.name,
                label: tag.name.toLowerCase(),
                accuracy: tag.confidence
            }
        )

        return (response) => {
            return response.data.tags.map(manipulateTag)
        }
    }

}

class IBMconfig extends ServiceConfiguration {

    constructor(configuration,path) {
        super(configuration,path)
    }

    getHeaders = () => {
        const apikey = btoa(`apikey:${this.API_KEY}`)

        return {
            headers: {
                'Authorization': `Basic ${apikey}`,
                'Content-Type': this.imgPath.type === 'url' ? 'application/json' : 'application/octet-stream' 
            }
        }
    }

    getBody = () => {
            if (this.imgPath.type === 'localPath') {
                const file = getFile(this.imgPath.path)
                return file
            }

            if (this.imgPath.type === 'url') {
                return {}
            }
    }


    getParams = () => {
        if (this.imgPath.type === 'url') {
            return {
                url: this.imgPath.path
            }
        }

        if (this.imgPath.type === 'localPath') {
            return {}
        }
    }


    getURL = () => {
        if (this.imgPath.type === 'url' || this.imgPath.type === 'localPath') {
            return (this.API_ENDPOINT.match(/^http/) ? '' : this.API_URL_BASE) + this.API_ENDPOINT + this.API_URL_QUERY
        }
    }

    getHandleResponse = () => {

        const manipulateTag = (tag) => (
            {
                imgPath: this.imgPath,
                service: this.name,
                label: tag.class.toLowerCase(),
                accuracy: tag.score
            }
        )
        

        return (response) => {
        
            return response.data.images.find(obj => Object.keys(obj).includes('classifiers') ).classifiers[0].classes.map(manipulateTag)
            
        }
    }

}

export const createQuery = (config,path) => {

    let query

    if (config.name === 'Azure') {
        query = new AzureConfig( config, path )
    }

    if (config.name === 'IBM') {
        query = new IBMconfig( config, path )
    }

    return query
} 



export default createQuery

