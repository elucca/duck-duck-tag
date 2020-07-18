import fs from 'fs'

const writeRowsToFile = (rows: Array<string>, filename: string) => {
    const stream = fs.createWriteStream(filename, { flags: 'a' })
    rows.forEach(row => stream.write(row))
    stream.end()
}

export default writeRowsToFile