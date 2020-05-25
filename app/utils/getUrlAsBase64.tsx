// https://stackoverflow.com/questions/41846669/download-an-image-using-axios-and-convert-it-to-base64

const axios = require('axios')

declare namespace types {
    interface Response {
        data: string
    }
}


const getUrlAsBase64 = (url: String) => {
    return axios.get(url, {
        responseType: 'arraybuffer'
      })
      .then((response: types.Response) =>  Buffer.from(response.data, 'binary').toString('base64'))
  }


export default getUrlAsBase64