// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const getUrlAsBase64 = require('./src/getUrlAsBase64')


window.addEventListener('DOMContentLoaded', () => {
  
  // Lisäys
  const addPicButton = document.getElementById('add-pic-button')
  addPicButton.addEventListener('click', () => {
    
    getUrlAsBase64('https://picsum.photos/200').then(pic => {
      console.log('Adding picture!')
      const picContainer = document.getElementById('pic-container')
      const img = document.createElement('img')
      img.setAttribute('src','data:image/png;base64,' + pic)
      picContainer.appendChild(img)
    })
   
  })
  
  
})



