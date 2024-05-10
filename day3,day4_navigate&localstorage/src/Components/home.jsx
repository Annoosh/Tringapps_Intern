import React from 'react';
import CourseRegistrationForm from './form.jsx';
import '../Components/style.css';

import { useLocation } from 'react-router-dom';
function Home(){
    const location = useLocation();
    const {name,email,gender,center,courses} = location.state;
     
    // const {gender} = location.state;
    return (
        <div align="center">
             <table>
            <th>key</th>
            <th>value</th>
            <tr>
                <td>name</td>
                <td>{name}</td>
            </tr>
            <tr>
                <td>E-Mail</td>
                <td>{email}</td>
            </tr>
            <tr>
                <td>Gender</td>
                <td>{gender}</td>
            </tr>
            <tr>
                <td>center</td>
                <td>{center}</td>
            </tr>
            <tr>
                <td>Course</td>
                <td>{courses}</td>
            </tr>
        </table>
        </div>
        
        // <div>
        // <p align='center'>{fname}</p>
        // <p align='center'>{email}</p>
        // <p align='center'>{gender}</p>
        // <p align='center'>{center}</p>
        // </div>
         
        
    //     <div>
            // <div>{localStorage.getItem('fname')}</div>
    //         <div>{localStorage.getItem('email')}</div>
    //         <div>{localStorage.getItem('gender')}</div>
    //     </div>
    )
    
}
export default Home;