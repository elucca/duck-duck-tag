
const fs = require('fs')

const exportTags = (taglist) => {    
    const rows = taglist.map(makeRow)

    writeRowsToFile(rows)
}


const makeRow = (tag) => {
    const ts = new Date()
    return [tag.service, tag.label, tag.accuracy, tag.imgURL, ts].join(';').concat('\n')
}


const writeRowsToFile = (rows: Array<string>) => {
    let stream = fs.createWriteStream("export.csv", { flags: 'a' })

    rows.forEach(row => stream.write(row))

    stream.end()
}

export default exportTags