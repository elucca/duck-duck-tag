const axios = require('axios')


declare namespace types {
    interface tag {
        class: string,
        score: string
    }

    interface response {
        data: {
            tags: Array<tag>
        }
    }

    interface credentials {
        API_KEY: String,
        API_ENDPOINT: String
    }
}

const tagImageIBM = ( credentials: types.credentials, image_URL: String ) => {

    const BASE_URL = "https://api.eu-de.visual-recognition.watson.cloud.ibm.com/instances/"

    const API_URL = '/v3/classify?version=2018-03-19&url='

    // Quick fix. Checks if API_ENDPOINT is an URL (if the strings starts with 'http').
    // If so, the BASE_URL is not used
    const URL = (credentials.API_ENDPOINT.match(/^http/) ? '' : BASE_URL) + credentials.API_ENDPOINT + API_URL + image_URL

    const manipulateTag = (tag: types.tag) => ({ 'label': tag.class.toLowerCase(), 'accuracy': tag.score })
    

    const apikey = btoa(`apikey:${credentials.API_KEY}`)

    const auth_header = axios.defaults.headers.common['Authorization'] = 'Basic ' + apikey;

    
    const query = axios.post(URL,{headers: auth_header} )
        .then(response => {
            return response.data.images[1].classifiers[0].classes.map(manipulateTag)
        })
        .catch(err => {
            console.log('error:', err);
        })

        return query
}

 export default tagImageIBM
