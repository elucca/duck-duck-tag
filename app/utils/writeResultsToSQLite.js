const sqlite3 = require('sqlite3')


const writeResultsToSQLite = arg => {

    const filename  = arg.filename
    const result    = arg.result

    const insertIntoResultTable = (db,record) => {

        const values = [record.service, record.label, record.accuracy, record.imgPath.type, record.imgPath.path]


        // Horrible way to construct e.g INSERT INTO .... VALUES (?,?,?,?) 
        const statement = `INSERT INTO result VALUES ` + '(' +values.map((v) => '?').join(',') + ')'

        console.log(statement,values)

        db.run( statement , values , (err) => {
            if (err) {
                console.log(err.message)
            }
        })

    }


    let db = new sqlite3.Database(filename);
    
    db.serialize(() => {

        db.run('CREATE TABLE IF NOT EXISTS result(service text, label text, accuracy real, type text, path text)');
    
        result.forEach((record) => insertIntoResultTable(db,record))
        
        
    })

    db.close()

}

export default writeResultsToSQLite