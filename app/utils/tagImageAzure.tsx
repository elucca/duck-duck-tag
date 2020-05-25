const axios = require('axios')


declare namespace types {
    interface tag {
        name: string,
        confidence: string
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


const tagImageAzure = ( credentials: types.credentials, image_URL: String) => {


    const headers = {
        'Ocp-Apim-Subscription-Key': credentials.API_KEY,
        'Content-Type': 'application/json'
    }


    const API_URL = credentials.API_ENDPOINT + "/vision/v2.1/analyze?visualFeatures=Tags&language=en";


    const manipulateTag = (tag: types.tag) => ({ 'label': tag.name.toLowerCase(), 'accuracy': tag.confidence })

    const query = axios.post(API_URL,{"url": image_URL },{ headers: headers }).then((response: types.response) => { 
        return response.data.tags.map(manipulateTag)
    })
    
    return query
}

 export default tagImageAzure