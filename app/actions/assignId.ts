import {Dispatch} from '../reducers/types'

const incrementId = ( ) => {

    return (dispatch: Dispatch) => {
        dispatch( {
            type: 'INCREMENT'
        })
    }
}

export default incrementId