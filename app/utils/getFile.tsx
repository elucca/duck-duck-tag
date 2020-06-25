import fs from 'fs'

// Should probably be async instead
const getFile = (path: string) => {
    return fs.readFileSync(path)
}

export default getFile