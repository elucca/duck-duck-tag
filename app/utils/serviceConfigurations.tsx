import services from '../constants/services.json'

class serviceConfiguration {

    constructor(configuration) {
        this.name = configuration.name
        this.API_URL_QUERY = configuration.API_URL_QUERY
        this.API_URL_BASE = configuration.API_URL_BASE
        this.API_ENDPOINT = configuration.API_ENDPOINT
    }

    setImageURL = image_URL => {
        this.image_URL = image_URL
    }

    getName =  () => {
        return this.name
    }


    updateConfiguration = configuration => {
        this.API_URL_QUERY = configuration.API_URL_QUERY
        this.API_URL_BASE = configuration.API_URL_BASE
        this.API_ENDPOINT = configuration.API_ENDPOINT
    }


}

class AzureConfig extends serviceConfiguration {

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
        return {"url": this.image_URL } 
    }

    getHandleResponse = () => {

        const manipulateTag = (tag: types.tag) => (
            { 
                imgURL: this.image_URL, 
                service: this.name, 
                label: tag.name.toLowerCase(), 
                accuracy: tag.confidence 
            }
        )

        return (response) => {
            console.log('azure handle', response.data.tags)
            
            return response.data.tags.map(manipulateTag)
        }
    }

}



class IBMconfig extends serviceConfiguration {

    constructor(configuration) {
        super(configuration)
    }

    getHeaders = () => {
        return {
            'Ocp-Apim-Subscription-Key': this.API_KEY,
            'Content-Type': 'application/json'
        }
    }

    getBody = () => {
        return { } 
    }

   

    getURL = () => {
        return (this.API_ENDPOINT.match(/^http/) ? '' : this.API_URL_BASE)  + this.API_ENDPOINT + this.API_URL_QUERY + this.image_URL

    }

    getHandleResponse = () => {

        const manipulateTag = (tag: types.tag) => (
            { 
                imgURL: this.image_URL, 
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
    let serviceConfigs = []

    serviceConfigs.push( new AzureConfig(  services.find(serv => serv.name==='Azure') )  )
    serviceConfigs.push( new IBMconfig(    services.find(serv => serv.name==='IBM-watson') )  )

    return(serviceConfigs)
}


export default getServiceConfigurations

