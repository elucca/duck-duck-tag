
import fs  from 'fs'

const makeRow = (result) => {
    const ts = new Date()
    return [result.service, result.label, result.accuracy, result.imgURL, ts].join(';').concat('\n')
}


const writeRowsToFile = (rows: Array<string>) => {
    const stream = fs.createWriteStream("export.csv", { flags: 'a' })

    rows.forEach(row => stream.write(row))

    stream.end()
}

const exportResults = (job) => {
    const rows = job.result.map(makeRow)

    writeRowsToFile(rows)
}



export default exportResults