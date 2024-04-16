import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = () => {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('excelFile', file);
        try {
            const response = await axios.post('http://localhost:4000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('File uploaded successfully');
            setSuccess(true);
        } catch (err) {
            console.error('Error uploading file:', err);
            setError('Error uploading file');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Upload File</h2>
            <form onSubmit={handleSubmit} className="mt-3">
                <div className="input-group mb-3">
                    <input type="file" className="form-control" onChange={handleFileChange} />
                    <button type="submit" className="btn btn-primary">Upload</button>
                </div>
            </form>
            {success && <p className="text-success">File uploaded successfully</p>}
            {error && <p className="text-danger">Error: {error}</p>}
        </div>



    );
};

export default UploadFile;
