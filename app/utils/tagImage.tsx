import axios from 'axios'
import ServiceConfiguration from './ServiceConfiguration'
import Path from '../components/Path'
import getFile from './getFile'
import * as FormData from 'form-data'

const tagImage = (serviceConfiguration: ServiceConfiguration) => {

    const URL               = serviceConfiguration.getURL()
    const headers           = serviceConfiguration.getHeaders()
    const handleResponse    = serviceConfiguration.getHandleResponse()
    const body              = serviceConfiguration.getBody()
    const params            = serviceConfiguration.getParams()


    return axios.post(URL, body, headers)
        .then(handleResponse)
        .catch(err => {
            console.log('Error tagging images:',err)
        })

}

export default tagImage