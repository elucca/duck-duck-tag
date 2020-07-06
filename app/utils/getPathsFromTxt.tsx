import fs from 'fs'

// Reads paths separated by a new line from a .txt file.
// Currently assumes the text file is UTF-8 encoded. Ignores empty lines.
const getPathsFromTxt = (txtFilePath: string) => {
    const file = fs.readFileSync(txtFilePath, 'utf8')
    // Should recognize any type of newline, see http://www.unicode.org/reports/tr18/#Line_Boundaries
    const paths = file.split(/[\n\u0085\u2028\u2029]|\r\n?/g).filter(line => line !== "")
    return paths
}

export default getPathsFromTxt