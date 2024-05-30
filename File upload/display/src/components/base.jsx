import React, { useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import mammoth from 'mammoth';
import { FaFileAlt, FaFileExcel, FaFileImage, FaFileVideo, FaFileWord, FaFilePdf } from 'react-icons/fa';
import { getDocument } from 'pdfjs-dist/webpack'; 
import './Show.css';

function Show() {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [header, setHeader] = useState([]);
    const [rows, setRows] = useState([]);
    const [pdfContent, setPdfContent] = useState("");

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
            } else if (file.type.startsWith('image/')) {
                reader.readAsDataURL(file);
                content = await new Promise(resolve => {
                    reader.onload = () => resolve(reader.result);
                });
            } else if (file.type.startsWith('video/')) {
                reader.readAsDataURL(file);
                content = await new Promise(resolve => {
                    reader.onload = () => resolve(reader.result);
                });
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                content = await new Promise((resolve, reject) => {
                    mammoth.extractRawText({ arrayBuffer: file })
                        .then(result => resolve(result.value))
                        .catch(err => reject(err));
                });
            } else if (file.type === 'application/pdf') {
                 
                reader.onload = async (event) => {
                    const arrayBuffer = event.target.result;
                    try {
                        const pdf = await getDocument({ data: arrayBuffer }).promise;
                        const content = await extractTextFromPDF(pdf);
                        setPdfContent(content);
                    } catch (error) {
                        console.error('Error loading PDF:', error);
                    }
                };
                reader.readAsArrayBuffer(file);
                content = file;
            }

            return { name: file.name, type: file.type, content };
        }));

        setFiles(prevFiles => [...prevFiles, ...updatedFiles]);
    };

    const handleFileClick = (file) => {
        setSelectedFile(file);
    };

    const renderFileIcon = (file) => {
        if (file.type === 'text/plain') {
            return <FaFileAlt />;
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel') {
            return <FaFileExcel />;
        } else if (file.type.startsWith('image/')) {
            return <FaFileImage />;
        } else if (file.type.startsWith('video/')) {
            return <FaFileVideo />;
        } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            return <FaFileWord />;
        } else if (file.type === 'application/pdf') {
            return <FaFilePdf />;
        } else {
            return <FaFileAlt />;
        }
    };

    const extractTextFromPDF = async (pdf) => {
        const numPages = pdf.numPages;
        let extractedContent = ""; 

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i); 
            const textContent = await page.getTextContent(); 
            const textItems = textContent.items; 

            let pageContent = ""; 

            for (const item of textItems) {
                if (item.str) {
                    pageContent += item.str.trim(); 

                    if (item.str.trim().endsWith(".")) {
                        extractedContent += pageContent + "\n"; 
                        pageContent = ""; 
                    }
                }
            }

            if (pageContent !== "") {
                extractedContent += pageContent + "\n"; 
                pageContent = ""; 
            }
        }

        return extractedContent; 
    };

    return (
        <div className="container">
            <p className="upload-title">UPLOAD YOUR FILES</p>
            <input type="file" name="file" onChange={handleFile} className="file-input" multiple />
            <div className="file-list">
                {files.map((file, index) => (
                    <div key={index} className="file-item" onClick={() => handleFileClick(file)}>
                        <div className="file-icon">{renderFileIcon(file)}</div>
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
                    <img src={selectedFile.content} alt={selectedFile.name} width="50%"/>
                </div>
            )}

            {selectedFile && selectedFile.type.startsWith('video/') && (
                <div className="file-content">
                    <video controls>
                        <source src={selectedFile.content} type={selectedFile.type} width="50%"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {selectedFile && selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' && (
                <div className="file-content">
                    <pre>{selectedFile.content}</pre>
                </div>
            )}

            {selectedFile && selectedFile.type === 'application/pdf' && (
                <div className="file-content">
                    <pre>{pdfContent}</pre>
                </div>
            )}
        </div>
    );
}

export default Show;




 