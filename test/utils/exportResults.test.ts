import exportResults from '../../app/utils/exportResults'
import writeRowsToFile from '../../app/utils/writeRowsToFile'
import dummyJob from '../helpers/dummyjob.json'

jest.mock('../../app/utils/writeRowsToFile', () => {
    return jest.fn()
})



describe('writeRowToFile is called with correct parameters',  () => {

    exportResults(dummyJob,'CSV')
    exportResults(dummyJob,'JSON')   
    
    // Calls is a nested array consisting of calls, in this example one for CSV and one for JSON
    // Each call is an array consisting of the call parameters for the function
    const calls = writeRowsToFile.mock.calls

    it('should format CSV correctly',() => {

        const  CSVcall = calls[0]
        // Nicer way to do this?
        expect( CSVcall[0][0].split(';') ).toContain('C:/jalka.jpg') // First call, first param, first object/row. contains path of file
        expect( CSVcall[1].split('.')[1] ).toBe('csv')               // First call, second param. extension of filename is correct
    })


    it('should format JSON correctly',() => {
        
        const  JSONcall = calls[1]
        
        const parsedJSON = JSON.parse( JSONcall[0] ) // Test throws error if JSON is not valid

        expect( parsedJSON.result[0].path ).toEqual('C:/jalka.jpg') 
        expect( JSONcall[1].split('.')[1] ).toBe('json')   

    })
})




