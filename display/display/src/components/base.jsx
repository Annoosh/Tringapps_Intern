import React, { useState } from 'react';

function Show() {
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');

    const handleFile = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsText(file);
        reader.onload = () => {
            setFileName(file.name);
            setFileContent(reader.result);
        };
         
    };

    return (
        <div>
            <p>UPLOAD YOUR FILES</p>
            <input type="file" name="file" onChange={handleFile} />
            <br />
            {/* <p>{fileName}</p> */}
            <p>{fileContent}</p>
        </div>
    );
};

export default Show;
