const fs    = require('fs')
const axios = require('axios')
const jwt = require('jsonwebtoken')
const querystring = require('querystring')


const postaa = () => {

    const privateKey = fs.readFileSync('privakey.txt')
    console.log('avaimemme', privateKey)

    // directly send a signed JWT to vision api: https://developers.google.com/identity/protocols/oauth2/service-account#jwt-auth
    // (substitute kid, iss and sub with actual credentials)

    const token = jwt.sign({
        header: {
            alg: "RS256",
            typ: "JWT",
            kid: "private_key_id"
        },
        iss: "client_email",
        sub: "client_email",
        aud: "https://vision.googleapis.com/",
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (60 * 60) // expires in 1h
    }, privateKey)


    const body = {
        requests: [
            {
                image: {
                    source: {
                        imageUri: "https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg"
                    }
                },
                
                features: [
                    {
                        type: "LABEL_DETECTION",
                        maxResults: 10
                    }
                ]
            }
        ]
    }

    console.log("bodymme", body)
    
    const header =  {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }

    const URL = 'https://vision.googleapis.com/v1/images:annotate'

    return axios.post(URL, body, { header } )
                    .then(resp => {

                        console.log('responsemme',resp)

                        return true
                    })
                    .catch(err => {
                        
                        console.log('Error tagging images:',err)
                    })
}


postaa()

