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


    const apikey = btoa(`apikey:${serviceConfiguration.API_KEY}`)



    const bodyFormData = new FormData()
    
    const image = getFile("fruitbowl.jpg")

    bodyFormData.append('hedelmämalja', image)          // [object Object]
    console.log('otsikkomme',bodyFormData.getHeaders)   // undefined

    //bodyFormData.append('images_file', new Blob(image, {type: 'image/jpeg'}), 'fruitbowl.jpg') // We needs the third argument
    
    console.log("bodyform data", bodyFormData) // FormData {}

    const IBMconfig = {
        headers: {
            'Authorization': `Basic ${apikey}`,
            'Content-Type': 'multipart/form-data',
            //'Content-Disposition': 'form-data'
        }
    }

    //console.log("bodyformdata headers", bodyFormData.getHeaders())

    return axios.post(URL, bodyFormData, IBMconfig
        
        // params: params, paramsSerializer: (params) => {

        //         const keys = Object.keys(params)
                
                
        //         let result = '';
        //         Object.keys(params).forEach(key => {
        //             result += `${key}=${decodeURIComponent(params[key])}&`;
        //         });
        //         return result.substr(0, result.length - 1);
        //     }
        //
        )
        .then(handleResponse)
        .catch(err => {
            console.log('Error tagging images:',err)
        })

}

export default tagImage