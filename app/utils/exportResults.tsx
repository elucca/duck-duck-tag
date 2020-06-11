
const fs = require('fs')

const exportResults = (result) => {    
    const rows = result.map(makeRow)

    writeRowsToFile(rows)
}


const makeRow = (result) => {
    const ts = new Date()
    return [result.service, result.label, result.accuracy, result.imgURL, ts].join(';').concat('\n')
}


const writeRowsToFile = (rows: Array<string>) => {
    let stream = fs.createWriteStream("export.csv", { flags: 'a' })

    rows.forEach(row => stream.write(row))

    stream.end()
}

export default exportResults