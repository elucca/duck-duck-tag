import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import routes from '../constants/routes.json';
import Result from './Result'
import Setup  from './Setup'


const Image = (props) => {

    const [animation, setAnimation] = useState('')
  
    const job = props.job
    const setJob = props.setJob
    const configuration  = props.configuration

    return (
        <div>
            <div data-tid="backButton">
                <Link to={routes.HOME}>
                    <i className="fa fa-arrow-left fa-3x" />
                </Link>
            </div>
            <Setup job={job} setJob={setJob}  setAnimation={setAnimation} configuration={configuration} ></Setup>        
            <Result job={job} animation={animation}></Result>
        </div>
    )
}


export default Image