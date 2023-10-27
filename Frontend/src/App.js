import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/images');
        setUploadedImages(response.data);
      } catch (err) {
        console.error('Error fetching images:', err);
      }
    };
    fetchImages();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('photo', selectedFile);

        await axios.post('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setSelectedFile(null);

        // Re-fetch images after upload
        const response = await axios.get('http://127.0.0.1:5000/images');
        setUploadedImages(response.data);

        setError(null);
      } catch (err) {
        setError('Error uploading the image. Please try again.');
        console.error('Error uploading image:', err);
      } finally {
        setUploading(false);
      }
    } else {
      setError('Please select a file to upload.');
    }
  };

  const handleDeleteImage = async (image_name) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/delete/${image_name}`);
      setUploadedImages(uploadedImages.filter(image => image !== image_name));
    } catch (err) {
      setError('Error deleting the image. Please try again.');
      console.error('Error deleting image:', err);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-heading">Image Storage</h1>
      <label className="choose-file">
        Select an image...
        <input type="file" accept="image/png, image/jpeg, image/gif" onChange={handleFileChange} />
      </label>
      <button className="upload-button" onClick={handleUpload}>Upload</button>
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        <p>Drag & drop an image file here or click to select one.</p>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="uploaded-images">
        {uploadedImages.map(image_name => (
          <div key={image_name} className="uploaded-image">
            <img src={`http://127.0.0.1:5000/images/${image_name}`} alt="Uploaded" />
            <button className="delete-button" onClick={() => handleDeleteImage(image_name)}>Delete</button>
            <p className="image-name">{image_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
