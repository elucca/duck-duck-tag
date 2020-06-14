import axios from 'axios'
import ServiceConfiguration   from './ServiceConfiguration'

const tagImage = (serviceConfiguration: ServiceConfiguration, imgURL: string) => {

    serviceConfiguration.setImageURL(imgURL)

    const URL               = serviceConfiguration.getURL()
    const headers           = serviceConfiguration.getHeaders()
    const handleResponse    = serviceConfiguration.getHandleResponse(imgURL)
    const body              = serviceConfiguration.getBody()

    return axios.post(URL, body ,{ headers: headers })
                .then(handleResponse)
                .catch(err => {
                    console.log('Error tagging images:',err)
                })

}

export default tagImage