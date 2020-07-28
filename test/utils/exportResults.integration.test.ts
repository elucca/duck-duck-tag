/**
 * @jest-environment node
 */

import fs from 'fs'
import exportResults from '../../app/utils/exportResults'
import dummyJob from '../helpers/dummyjob.json'
import writeResultsToSQLite from '../../app/utils/writeResultsToSQLite'
import Database from '../../app/node_modules/better-sqlite3'


// All exports are written with this filename
const testFilename = 'testDummyJobExport'



const clean = () => {

    // Returns a single promise for two promises (each promise removing the created test exportfile when resolving)
    return Promise.all( ['.csv','.json','.db'].map(extension => fs.unlink(testFilename.concat(extension), (err) => err))  )
}

afterAll(() => {
    // afterAll expects an function returning a promise
    return clean()
});


test('writing to CSV creates a file', () => {

    exportResults(dummyJob,'csv',testFilename)

    return fs.access( testFilename.concat('.csv') , (e) => {
        // if the file is found, access returns undefined. If not, an error is thrown. Therefore we test that the error does not exist
        // IS THERE A BETTER WAY?
        expect(e).toBeFalsy()
    })
})

test('writing to JSON creates a file', () => {

    exportResults(dummyJob,'json',testFilename)

    return fs.access( testFilename.concat('.json') , (e) => {
        // see before
        expect(e).toBeFalsy() 
    })

})




describe('exporting to SQLite', () => {

    const DBfilename = testFilename.concat('.db')
    writeResultsToSQLite({result: dummyJob.result, filename: DBfilename  })

    test('creates a file', () => {        
        return fs.access( DBfilename , (e) => {
            // see before
            expect(e).toBeFalsy() 
        })
    })
    
    test('inserts the correct amount of observations', () => {

        const db = new Database(DBfilename)
        const count = db.prepare(`SELECT COUNT(*) AS rowcount FROM result WHERE service='Azure'`) // Count of Azure related rows

        expect( count.get().rowcount ).toEqual(2)

    })


})

