const axios = require('axios')


declare namespace types {
    interface tag {
        service: string,
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

const tagImage = (serviceConfiguration, imgURL: String) => {

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