
const fs = require('fs')

const exportTags = (imgSource, taglist) => {
    writeRowToFile(makeRow(imgSource, taglist))
}

const writeRowToFile = (row: string) => {
    let stream = fs.createWriteStream("export.csv", { flags: 'a' })
    stream.write(row)
    stream.end()
}

const makeRow = (imgSource: string, tagList: Array<any>) => {
    let row = imgSource + ","
    row += tagList.map(tag => tag.label + ":"  + tag.accuracy) + "\n"

    return row
}

export default exportTags