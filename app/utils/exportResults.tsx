
import fs  from 'fs'
const { ipcRenderer } = require('electron');

const sendResultsToMainForWritingToSQLite = (result,filename) => {

        // Data to send to main process
        const data = {
            result: result,
            filename: filename
        };

        console.log('sending this to main process' , data)

        // Main process has listener for action 'request-write-to-sqlite'
        // listener is in main.dev.ts
        ipcRenderer.send('request-write-to-sqlite', data);
    
   
}


const makeRowForCSV = result => {
    const ts = new Date()
    return [result.service, result.label, result.accuracy,  result.imgPath.type, result.imgPath.path, ts].join(';').concat('\n')
}

const createJSON = result => {
    
    return [JSON.stringify({ result: result, ts: new Date() })] // WriteRowsToFile expects an array
}


const writeRowsToFile = (rows: Array<string>, filename: string) => {


    const stream = fs.createWriteStream(filename, { flags: 'a' })
    rows.forEach(row => stream.write(row))
    stream.end()
}

const exportResults = (job, formatToExportTo: string) => {


    console.log('exporting to', formatToExportTo) 

    const filename = 'export.'.concat( formatToExportTo === 'SQLite' ? 'db' : formatToExportTo )

    if (formatToExportTo === 'SQLite') {

        sendResultsToMainForWritingToSQLite(job.result,filename)

        return

    } 
    

    const rows = formatToExportTo === 'CSV' ? job.result.map(makeRowForCSV) : createJSON(job.result)

    writeRowsToFile(rows, filename)
}



export default exportResults