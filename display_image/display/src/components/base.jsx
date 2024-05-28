// import React, { useState } from 'react';
// import { OutTable,ExcelRenderer } from 'react-excel-renderer';
// import { renderAsync } from 'docx-preview';
// import './Show.css';

// function Show() {
//     const [files, setFiles] = useState([]);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [header, setHeader] = useState([]);
//     const [rows, setRows] = useState([]);
    
//     const handleFile = async e => {
//         const newFiles = Array.from(e.target.files);
//         const updatedFiles = await Promise.all(newFiles.map(async file => {
//             let content = '';
//             const reader = new FileReader();

//             if (file.type === 'text/plain') {
//                 reader.readAsText(file);
//                 content = await new Promise(resolve => {
//                     reader.onload = () => resolve(reader.result);
//                 });
//             } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
//                 await new Promise((resolve, reject) => {
//                     ExcelRenderer(file, (err, response) => {
//                         if (err) {
//                             console.log(err);
//                             reject(err);
//                         } else {
//                             setHeader(response.rows[0]);
//                             setRows(response.rows.slice(1));
//                             content = response.rows;
//                             resolve();
//                         }
//                     });
//                 });
//             } else if (file.type.startsWith('image/')) {
//                 reader.readAsDataURL(file);
//                 content = await new Promise(resolve => {
//                     reader.onload = () => resolve(reader.result);
//                 });
//             } else if (file.type.startsWith('video/')) {
//                 reader.readAsDataURL(file);
//                 content = await new Promise(resolve => {
//                     reader.onload = () => resolve(reader.result);
//                 });
//             } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//                 content = await new Promise((resolve, reject) => {
//                     const docContainer = document.createElement('div');
//                     renderAsync(file, docContainer)
//                         .then(() => resolve(docContainer.innerHTML))
//                         .catch(err => reject(err));
//                 });
//             }

//             return { name: file.name, type: file.type, content };
//         }));

//         setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
//     };

//     const handleFileClick = (file) => {
//         setSelectedFile(file);
//     };

//     return (
//         <div className="container">
//             <p className="upload-title">UPLOAD YOUR FILES</p>
//             <input type="file" name="file" onChange={handleFile} className="file-input" multiple />
//             <div className="file-list">
//                 {files.map((file, index) => (
//                     <div key={index} className="file-item" onClick={() => handleFileClick(file)}>
//                         <p>{file.name}</p>
//                     </div>
//                 ))}
//             </div>

//             {selectedFile && selectedFile.type === 'text/plain' && (
//                 <div className="file-content">
//                     <pre>{selectedFile.content}</pre>
//                 </div>
//             )}

//             {selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'application/vnd.ms-excel') && (
//                 <div className="table-content">
//                     <table>
//                         <thead>
//                             <tr>
//                                 {header.map((col, index) => (
//                                     <th key={index}>{col}</th>
//                                 ))}
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {rows.map((row, rowIndex) => (
//                                 <tr key={rowIndex}>
//                                     {row.map((cell, cellIndex) => (
//                                         <td key={cellIndex}>{cell}</td>
//                                     ))}
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             )}

//             {selectedFile && selectedFile.type.startsWith('image/') && (
//                 <div className="file-content">
//                     <img src={selectedFile.content} alt={selectedFile.name} />
//                 </div>
//             )}

//             {selectedFile && selectedFile.type.startsWith('video/') && (
//                 <div className="file-content">
//                     <video controls>
//                         <source src={selectedFile.content} type={selectedFile.type} />
//                         Your browser does not support the video tag.
//                     </video>
//                 </div>
//             )}

//             {selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
//                 <div className="file-content" dangerouslySetInnerHTML={{ __html: selectedFile.content }}></div>
//             )}
//         </div>
//     );
// }

// export default Show;


import React, { useState } from 'react';
import { OutTable, ExcelRenderer } from 'react-excel-renderer';
import mammoth from 'mammoth';
import './Show.css';

function Show() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [header, setHeader] = useState([]);
    const [rows, setRows] = useState([]);
    
    const handleFile = async e => {
        const newFiles = Array.from(e.target.files);
        const updatedFiles = await Promise.all(newFiles.map(async file => {
            let content = '';
            const reader = new FileReader();

            if (file.type === 'text/plain') {
                reader.readAsText(file);
                content = await new Promise(resolve => {
                    reader.onload = () => resolve(reader.result);
                });
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
                await new Promise((resolve, reject) => {
                    ExcelRenderer(file, (err, response) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            setHeader(response.rows[0]);
                            setRows(response.rows.slice(1));
                            content = response.rows;
                            resolve();
                        }
                    });
                });
            }else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                content = await new Promise((resolve, reject) => {
                    mammoth.extractRawText({ arrayBuffer: file })
                        .then(result => resolve(result.value))
                        .catch(err => reject(err));
                });
            }

            return { name: file.name, type: file.type, content };
        }));

        setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
    };

    const handleFileClick = (file) => {
        setSelectedFile(file);
    };

    return (
        <div className="container">
            <p className="upload-title">UPLOAD YOUR FILES</p>
            <input type="file" name="file" onChange={handleFile} className="file-input" multiple />
            <div className="file-list">
                {files.map((file, index) => (
                    <div key={index} className="file-item" onClick={() => handleFileClick(file)}>
                        <p>{file.name}</p>
                    </div>
                ))}
            </div>

            {selectedFile && selectedFile.type === 'text/plain' && (
                <div className="file-content">
                    <pre>{selectedFile.content}</pre>
                </div>
            )}

            {selectedFile && (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || selectedFile.type === 'application/vnd.ms-excel') && (
                <div className="table-content">
                    <table>
                        <thead>
                            <tr>
                                {header.map((col, index) => (
                                    <th key={index}>{col}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex}>{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedFile && selectedFile.type.startsWith('image/') && (
                <div className="file-content">
                    <img src={selectedFile.content} alt={selectedFile.name} />
                </div>
            )}

            {selectedFile && selectedFile.type.startsWith('video/') && (
                <div className="file-content">
                    <video controls>
                        <source src={selectedFile.content} type={selectedFile.type} />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                <div className="file-content">
                    <pre>{selectedFile.content}</pre>
                </div>
            )}
        </div>
    );
}

export default Show;
