import React, { useRef, useState } from "react"
import FileMagicNumbers from "./FileMagicNumbers";

const PROJECTS_API = 'http://localhost:8080/filesignature'

const DragNDrop = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState([]);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);
    const [responseData, setResponseData] = useState(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e) => {
        e.preventDefault();
        setIsDragging(false);

        const formData = new FormData();
        let allFiles = [...files];

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const droppedFiles = Array.from(e.dataTransfer.files);
            allFiles = [...allFiles, ...droppedFiles];
            setFiles(allFiles);
        }

        for (let i = 0; i < allFiles.length; i++){
            formData.append('file', allFiles[i]);
        }

        setUploading(true);
        setResponseData(null);

        try{
            const response = await fetch(
                PROJECTS_API,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if(!response.ok){
                throw new Error("Upload Failed" + response.status);
            }

            const result = await response.json();

            setResponseData(result);
        }catch (error) {
            console.error('Error uploading files:', error);
            setMessage('Failed to upload files. Please try again.');
        } finally {
            setUploading(false);
        }
    }

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files.length > 0){
            const selectedFiles = Array.from(e.target.files);
            setFiles(
                (prevFiles) => [...prevFiles, ...selectedFiles]
            );
        }
    }
    
    return (
        <>
            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current.click()}
            >
                {
                    uploading
                    ? <p className="file-dropzone-text">Uploading...</p>
                    : <label className="file-dropzone">
                        <input
                            className="file-input"
                            type="file"
                            multiple
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                        />
                        <p className="file-dropzone-icon">
                            📥
                        </p>
                        <span className="file-dropzone-text">
                            {
                                isDragging 
                                ? "Arraste os arquivos aqui!"
                                : "Clique para carregar ou arraste arquivos 😁"
                            }
                        </span>
                        <span className="file-dropzone-subtext">WEBP, PNG, JPG, JPEG, or GIF (max. 10MB)</span>
                    </label>
                }
            </div>
            <hr className="divider"></hr>
            <FileMagicNumbers data={responseData} />
        </>
    );
};

export default DragNDrop;