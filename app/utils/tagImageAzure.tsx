const axios = require('axios')


declare namespace types {
    interface tag {
        service: string,
        name: string,
        confidence: string
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


const tagImageAzure = ( configuration: types.configuration, image_URL: string) => {


    const headers = {
        'Ocp-Apim-Subscription-Key': configuration.API_KEY,
        'Content-Type': 'application/json'
    }


    const API_URL = configuration.API_ENDPOINT.concat(configuration.API_URL_QUERY);


    const manipulateTag = (tag: types.tag) => (
        { 
            imgURL: image_URL, 
            service: 'Azure', 
            label: tag.name.toLowerCase(), 
            accuracy: tag.confidence 
        }
    )

    const query = axios.post(API_URL,{"url": image_URL },{ headers: headers }).then((response: types.response) => { 
        return response.data.tags.map(manipulateTag)
    })
    
    return query
}

 export default tagImageAzure