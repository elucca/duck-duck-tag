import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';


type Props = {
    addConfiguration: (object) => void;
}


const Configuration = ( props: Props ) => {

    console.log('probs', props)

    const addConfiguration = props.addConfiguration

    const handleConfigure = () => {
        console.log('configin')
        addConfiguration({ service: 'azure' })
    }

    return(
        <div>
            
            <Link to={routes.HOME}>
                <i className="fa fa-arrow-left fa-3x" />
            </Link>
            Configuration
            <button onClick={handleConfigure}>Configure!</button>
        </div>
        
    )
}

export default Configuration