/**
 * @jest-environment node
 */

import fs from 'fs'
import exportResults from '../../app/utils/exportResults'
import dummyJob from '../helpers/dummyjob.json'
import writeResultsToSQLite from '../../app/utils/writeResultsToSQLite'


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

test('writing to SQLite creates a file', () => {

    writeResultsToSQLite({result: dummyJob.result, filename: testFilename.concat('.db') })

    return fs.access( testFilename.concat('.db') , (e) => {
        // see before
        expect(e).toBeFalsy() 
    })

})
