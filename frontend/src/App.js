import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';

function App() {
  // State variables to hold user input and the generated poster
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null); // Stores the URL of the uploaded image for preview
  const [generatedPoster, setGeneratedPoster] = useState(null); // Stores the URL of the generated poster from the backend

  // Handles the poster generation process by sending data to the backend
  const handleGeneratePoster = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('organization', organization);

    // The `image` state holds a URL (created by URL.createObjectURL). 
    // To send it to the backend, we need to fetch the actual image data as a Blob.
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append('image', blob);

    try {
      // Send a POST request to the backend API to generate the poster
      const result = await axios.post('/api/generate-poster', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for sending file data
        },
        responseType: 'blob', // Expecting a binary response (the image file) from the backend
      });
      // Create a URL for the received image blob and set it for display
      setGeneratedPoster(URL.createObjectURL(result.data));
    } catch (error) {
      console.error('Error generating poster:', error);
      // TODO: Implement more user-friendly error feedback
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content">
        <PosterCanvas name={name} organization={organization} image={image} generatedPoster={generatedPoster} />
        <div className="controls-container">
          <TextInput setName={setName} setOrganization={setOrganization} />
          <ImageUpload setImage={setImage} />
          <button className="button" onClick={handleGeneratePoster}>Generate Poster</button>
        </div>
      </main>
    </div>
  );
}

export default App;