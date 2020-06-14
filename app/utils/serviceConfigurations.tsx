import services from '../constants/services.json'
import { types } from '@babel/core'
import axios from 'axios'



class ServiceConfiguration {

    constructor(configuration) {
        this.name = configuration.name
        this.API_URL_QUERY = configuration.API_URL_QUERY
        this.API_URL_BASE = configuration.API_URL_BASE
        this.API_ENDPOINT = configuration.API_ENDPOINT
        this.API_KEY =      configuration.API_KEY
    }

    setImageURL = imgURL => {
        this.imgURL = imgURL
    }

    getName =  () => {
        return this.name
    }


    updateConfiguration = configuration => {
        this.API_URL_QUERY = configuration.API_URL_QUERY
        this.API_URL_BASE = configuration.API_URL_BASE
        this.API_ENDPOINT = configuration.API_ENDPOINT
        this.API_KEY =      configuration.API_KEY
    }

}

class AzureConfig extends ServiceConfiguration {

    constructor(configuration) {
        super(configuration)
    }



    getHeaders = () => {
        return {
            'Ocp-Apim-Subscription-Key': this.API_KEY,
            'Content-Type': 'application/json'
        }
    }



    getURL = () => {
        return this.API_ENDPOINT.concat(this.API_URL_QUERY);
    }

    getBody = () => {        
        return {"url": this.imgURL } 
    }

    getHandleResponse = (imgURLcorrespondingToResponse) => {

        const manipulateTag = (tag: types.tag) => (
            { 
                imgURL: imgURLcorrespondingToResponse, 
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

    constructor(configuration) {
        super(configuration)
    }

    getHeaders = () => {
        const apikey = btoa(`apikey:${this.API_KEY}`)
        const header = axios.defaults.headers.common['Authorization'] = `Basic ${apikey}`

        return {header}
    }

    getBody = () => {
        return { } 
    }

   

    getURL = () => {        
        return (this.API_ENDPOINT.match(/^http/) ? '' : this.API_URL_BASE) + this.API_ENDPOINT + this.API_URL_QUERY + this.imgURL

    }

    getHandleResponse = (imgURLcorrespondingToResponse) => {
    
        const manipulateTag = (tag: types.tag) => (
            { 
                imgURL: imgURLcorrespondingToResponse, 
                service: this.name,
                label: tag.class.toLowerCase(),
                accuracy: tag.score 
            }
        )

        return (response) => {
            return response.data.images[1].classifiers[0].classes.map(manipulateTag)
        }
    }

   

}




const getServiceConfigurations = () => {
    
    const serviceConfigs = []

    serviceConfigs.push( new AzureConfig(  services.find(serv => serv.name==='Azure') )  )
    serviceConfigs.push( new IBMconfig(    services.find(serv => serv.name==='IBM') )  )

    return(serviceConfigs)
}


export default getServiceConfigurations

