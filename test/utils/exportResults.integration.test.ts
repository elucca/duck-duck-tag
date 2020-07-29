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



describe('exporting to CSV', () => {
        
    exportResults(dummyJob,'CSV',testFilename)

    const filename = testFilename.concat('.csv')


    // Jest will wait until done() is called
    test('creates a file', done => {

        return fs.access( filename , (e) => {
            // if the file is found, access returns undefined. If not, an error is thrown. Therefore we test that the error does not exist
            // IS THERE A BETTER WAY?
            expect(e).toBeFalsy()
            done()
        })
    })
    
    test('writes lines in the file', done => {


        return fs.readFile(filename,'utf-8',(e,data) => {

            const lines =   data.split('\n')
                                .filter(line => line.length>0)

            expect( lines[0].split(';') ).toContain('C:/jalka.jpg')

            expect( lines.length ).toBe(4)
            done()
        })

    })
  
})

describe('exporting to JSON', () => {
        
    exportResults(dummyJob,'JSON',testFilename)

    const filename = testFilename.concat('.json')


    // Jest will wait until done() is called
    test('creates a file', done => {

        return fs.access( filename , (e) => {
            // if the file is found, access returns undefined. If not, an error is thrown. Therefore we test that the error does not exist
            // IS THERE A BETTER WAY?
            expect(e).toBeFalsy()
            done()
        })
    })
    
    test('writes JSON in the file', done => {

        return fs.readFile(filename,'utf-8',(e,data) => {

            const parsedJSON = JSON.parse( data ) // Test throws error if JSON is not valid

            expect( parsedJSON.result[0].path ).toEqual('C:/jalka.jpg') 
            expect( parsedJSON.result.length ).toBe(4)

            done()
        })

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

