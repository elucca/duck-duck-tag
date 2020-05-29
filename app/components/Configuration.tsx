import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';



const Configuration = () => {

    return(
        <div>
            
            <Link to={routes.HOME}>
                <i className="fa fa-arrow-left fa-3x" />
            </Link>
            Configuration
        </div>
        
    )
}

export default Configuration