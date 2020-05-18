
const axios = require('axios')
require('dotenv').config()

const API_KEY = process.env.API_KEY
const API_ENDPOINT = process.env.API_ENDPOINT

const headers = {
    'Ocp-Apim-Subscription-Key': API_KEY,
    'Content-Type': 'application/json'
}

const image_URL = 'http://foot.hiit.fi/jalka.jpg'
const API_URL = API_ENDPOINT + "/vision/v2.1/analyze?visualFeatures=Tags&language=en";


const manipulateTag = tag => ({ 'label': tag.name.toLowerCase(), 'accuracy': tag.confidence })

axios.post(API_URL,{"url": image_URL },{ headers: headers }).then(response => { 
    console.log(
        response.data.tags.map(manipulateTag)
    )
 })