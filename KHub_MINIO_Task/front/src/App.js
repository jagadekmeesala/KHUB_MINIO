import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/gif')) {
      setUploading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('photo', file);

        const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setUploadedImage(response.data.message);
        setError(null);
      } catch (err) {
        setError('Error uploading the image. Please try again.');
        console.error('Error uploading image:', err);
      } finally {
        setUploading(false);
      }
    } else {
      setError('Invalid file format. Please upload an image (PNG, JPEG, or GIF).');
    }
  };

  const handleDeleteImage = async () => {
    if (uploadedImage) {
      try {
        await axios.delete(`http://127.0.0.1:5000/delete/${uploadedImage}`);
        setUploadedImage(null);
      } catch (err) {
        setError('Error deleting the image. Please try again.');
        console.error('Error deleting image:', err);
      }
    }
  };

  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '2px solid #3498db',
    borderRadius: '30px',
    maxWidth: '400px',
    height: '400px',
    margin: '0 auto',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  };

  const errorMessageStyles = {
    color: '#ff0000',
    marginTop: '10px',
    textAlign: 'center',
  };

  const successMessageStyles = {
    color: '#007bff',
    fontWeight: 'bold',
  };

  const chooseFileStyles = {
    margin: '20px 0',
    padding: '10px 20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: 'white',
    cursor: 'pointer',
  };

  const imagePreviewStyles = {
    maxWidth: '100%',
    height: 'auto',
    margin: '10px 0',
  };

  return (
    <div style={containerStyles} className="image-upload-container">
      <h1>Image Storage</h1>
      <label style={chooseFileStyles}>
        Select an image...
        <input type="file" accept="image/png, image/jpeg, image/gif" onChange={handleFileChange} style={{ display: 'none' }} />
      </label>
      {uploading ? (
        <p>Uploading...</p>
      ) : (
        <p>Drag & drop an image file here or click to select one.</p>
      )}
      {error && <div style={errorMessageStyles} className="error-message">{error}</div>}
      {uploadedImage && (
        <div className="uploaded-image-container">
          <img src={`http://127.0.0.1:5000/images/${uploadedImage}`} alt="Uploaded" style={imagePreviewStyles} />
          <button onClick={handleDeleteImage} style={{ marginTop: '10px' }}>Delete</button>
          <p style={successMessageStyles}>Hurray!!! Image uploaded successfully!</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
