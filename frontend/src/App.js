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
  const [image, setImage] = useState(null); // Stores the file and preview URL

  // Handles the poster generation and download process
  const handleDownloadPoster = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('organization', organization);

    if (image && image.file) {
      formData.append('image', image.file);
    }

    try {
      const result = await axios.post('/api/generate-poster', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(new Blob([result.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'ubucon-poster.png');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
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
  <PosterCanvas name={name} organization={organization} image={image ? image.preview : null} />
        <div className="controls-container">
          <TextInput setName={setName} setOrganization={setOrganization} />
          <ImageUpload setImage={setImage} />
          <button className="button" onClick={handleDownloadPoster}>Download Poster</button>
        </div>
      </main>
    </div>
  );
}

export default App;