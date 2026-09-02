import React, { useRef, useState } from "react"

const DragNDrop = () => {
    const [files, setFiles] = useState([]);
    const [isDragging, setIsDragging] = useState([]);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        const xhr = new XMLHttpRequest();

        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0){
            const droppedFiles = Array.from(e.dataTransfer.files);
            setFiles(
                (prevFiles) => [...prevFiles, ...droppedFiles]
            );
            e.dataTransfer.clearData();
        }
        
        xhr.open('GET', '')
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
                <label className="file-dropzone">
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
                        {isDragging 
                        ? "Arraste os arquivos aqui!" 
                        : "Clique para carregar ou arraste arquivos 😁"}
                    </span>
                    <span className="file-dropzone-subtext">WEBP, PNG, JPG, JPEG, or GIF (max. 10MB)</span>
                </label>
            </div>
        </>
    );
};

export default DragNDrop;