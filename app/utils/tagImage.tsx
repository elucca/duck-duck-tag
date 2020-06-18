import axios from 'axios'
import ServiceConfiguration from './ServiceConfiguration'
import Path from '../components/Path'

const tagImage = (serviceConfiguration: ServiceConfiguration) => {

    const URL               = serviceConfiguration.getURL()
    const headers           = serviceConfiguration.getHeaders()
    const handleResponse    = serviceConfiguration.getHandleResponse()
    const body              = serviceConfiguration.getBody()

    return axios.post(URL, body ,{ headers: headers })
                .then(handleResponse)
                .catch(err => {
                    console.log('Error tagging images:',err)
                })

}

export default tagImage