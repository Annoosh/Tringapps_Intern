import React, { useState } from 'react';
import './style.css';

function Display() {
    const [showToast, setShowToast] = useState();

    function buttonClick() {
        setShowToast(true);
    }

    function closeToast() {
        setShowToast(false);
    }

    return (
        <div>
            <h2 align="center"><b>Toastify Message</b></h2>
            <br/>
            <button id="button" onClick={buttonClick}>Click Here</button>
            {showToast && (
                <div id="toastify" className="show">
                    Toast notification
                    <button className="close" onClick={closeToast}>&times;</button>
                </div>
            )}
        </div>
    );
}

export default Display;
