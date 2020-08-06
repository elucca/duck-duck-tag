
const fs    = require('fs')
const axios = require('axios')
const crypto = require('crypto-js')
const sha256 = require('crypto-js/sha256')
const moment = require('moment')


const postaa = () => {

    getSignatureKey = (key, dateStamp, regionName, serviceName) => {
        var kDate = crypto.HmacSHA256(dateStamp, "AWS4" + key); //dateStamp format YYYYMMDD
        var kRegion = crypto.HmacSHA256(regionName, kDate);
        var kService = crypto.HmacSHA256(serviceName, kRegion);
        var kSigning = crypto.HmacSHA256("aws4_request", kService);
        return kSigning;
    }

    
    const getUrlAsBase64 = (url) => {
        return axios.get(url, {
            responseType: 'arraybuffer'
        })
        .then(response =>  Buffer.from(response.data, 'binary').toString('base64'))
    }

    const date = moment().format("YYYYMMDD")
    const amzdate = moment().format("YYYYMMDDTHHmmssZ")

    // console.log("date", date, typeof(date))
    // console.log("date", amzdate, typeof(amzdate))


    const signedHeaders = 'content-type;host;x-amz-date' // headers to use for the signature
    const credentialScope = date + '/us-east-1/rekognition/aws4_request'
    const algorithm = 'AWS4-HMAC-SHA256'
    

    const requestPayload = '' // from body ??
    

    // Constructing a HTTP request following these instructions (4 tasks): https://docs.aws.amazon.com/general/latest/gr/sigv4_signing.html


    // 1. Task: create a canonical request: https://docs.aws.amazon.com/general/latest/gr/sigv4-create-canonical-request.html
    const canonicalRequest = 
        'POST\n' +
        'https://rekognition.us-east-1.amazonaws.com\n' +
        'Action=DetectLabel\n' + // might require headers as query strings
        'content-type:application/x-amz-json-1.1\n' + 
        'host:rekognition.us-east-1.amazonaws.com\n' + 
        'x-amz-date:' + amzdate + '\n' +
        signedHeaders + '\n' + 
        sha256(requestPayload).toString()

    // console.log("hashed payload", sha256(requestPayload).toString())


    // 2. Task: create a string to sign: https://docs.aws.amazon.com/general/latest/gr/sigv4-create-string-to-sign.html

    const string_to_sign = 
        algorithm + '\n' +
        amzdate + '\n' +
        credentialScope + '\n' +
        sha256(canonicalRequest).toString()

    // console.log("hashed canonical request", sha256(canonicalRequest).toString())
    // console.log("string to sign", string_to_sign)


    // 3. Task: calculate the signature: https://docs.aws.amazon.com/general/latest/gr/sigv4-calculate-signature.html
    const signingKey = getSignatureKey(
        "secret_access_key", // substitute with credential
        date,
        "us-east-1", // don't know whether this is correct
        "rekognition"
    )

    console.log("avaimemme", signingKey.toString())

    const signature = crypto.HmacSHA256(signingKey, string_to_sign).toString()
    console.log("allekirjoituksemme", signature)

    // 4. Task: construct HTTP request: https://docs.aws.amazon.com/general/latest/gr/sigv4-add-signature-to-request.html

    // substitute access_key_ID with actual credential
    const auth = `${algorithm} Credential=access_key_ID/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`

    
    const headers =  {
        'Authorization': auth,
        'host': 'rekognition.us-east-1.amazonaws.com',
        'Content-Type': 'application/x-amz-json-1.1',
        'x-amz-date': amzdate,
        'x-amz-target': 'RekognitionService.DetectLabels'
    }


    const image = getUrlAsBase64("https://watson-developer-cloud.github.io/doc-tutorial-downloads/visual-recognition/fruitbowl.jpg")


    const body = {
        "Image": {
            "Bytes": image
        },
        "MinConfidence": 0.0
    }

    console.log("bodymme", body)

    const URL = 'https://rekognition.us-east-1.amazonaws.com'

    return axios.post(URL, body, { headers } )
                    .then(resp => {

                        console.log('responsemme',resp)

                        return true
                    })
                    .catch(err => {
                        
                        console.log('Error tagging images:',err)
                    })
}


postaa()

