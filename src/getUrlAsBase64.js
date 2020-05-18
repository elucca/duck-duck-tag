
// https://stackoverflow.com/questions/41846669/download-an-image-using-axios-and-convert-it-to-base64

const axios = require('axios')

const getUrlAsBase64 = (url) => {
    return axios.get(url, {
        responseType: 'arraybuffer'
      })
      .then(response =>  Buffer.from(response.data, 'binary').toString('base64'))
  }


module.exports = getUrlAsBase64