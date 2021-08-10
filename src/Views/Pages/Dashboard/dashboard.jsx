import React from 'react'

import {useHistory} from 'react-router-dom'
import BarChart from './Charts/barchart'
import Doughnut    from './Charts/doughnut'

import './dashboard.css'


export default () =>{
 
   
    const browserHistory = useHistory();
    function redirect(){
        browserHistory.push('/viewbugs');
    }

    



return(
        
        <div className="dash-container"  >

            <div className="chart" onClick={redirect} >
                <BarChart onClick={redirect} />
                <h3>Tickets by Priority</h3>
            </div>
            <div className="chart" onClick={redirect} >
                <Doughnut onClick={redirect}/>
                <h3>Tickets by type</h3>
            </div>
            
           
           
            
        </div>

     

)
}
