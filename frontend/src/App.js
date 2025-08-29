import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';

function App() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [generatedPoster, setGeneratedPoster] = useState(null);

  const handleGeneratePoster = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('organization', organization);
    // The image state holds the URL. We need to fetch the blob.
    const response = await fetch(image);
    const blob = await response.blob();
    formData.append('image', blob);

    try {
      const result = await axios.post('/api/generate-poster', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });
      setGeneratedPoster(URL.createObjectURL(result.data));
    } catch (error) {
      console.error('Error generating poster:', error);
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