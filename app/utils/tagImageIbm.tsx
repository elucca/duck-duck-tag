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

    interface configuration {
        API_KEY: string,
        API_ENDPOINT: string,
        API_URL_QUERY: string,
        API_URL_BASE: string
    }
}

const tagImageIBM = ( configuration: types.configuration, image_URL: String ) => {

    // Should not happen..
    const checkIfUndefined = (str) => str ? str : ''

    const URL = checkIfUndefined(configuration.API_URL_BASE)  + checkIfUndefined(configuration.API_ENDPOINT) + checkIfUndefined(configuration.API_URL_QUERY) + image_URL


    const manipulateTag = (tag: types.tag) => ({ 'label': tag.class.toLowerCase(), 'accuracy': tag.score })
    

    const apikey = btoa(`apikey:${configuration.API_KEY}`)

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
