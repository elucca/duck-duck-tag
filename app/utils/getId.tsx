import { v4 as uuid } from 'uuid';

const getId = () => {
    const testUuid = uuid();
    const uuidShortened = testUuid.substring(0,8) + testUuid.substring(testUuid.length-13)

    return uuidShortened
}

export default getId
