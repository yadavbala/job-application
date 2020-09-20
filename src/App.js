import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import JobApplicationForm from './Components/JobApplicationForm'
import AdminDashboard from './Components/AdminDashboard'
import './style.css'
function App(){
    return(
        <BrowserRouter>
        <div>
            <Route path='/' component={JobApplicationForm} exact={true}/>
            <Route path='/admin' component={AdminDashboard}/>
        </div>
        </BrowserRouter>
    )
}

export default App