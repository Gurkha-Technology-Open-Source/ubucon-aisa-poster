import React, { useState, useRef } from 'react';
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

  // Handles the poster download from the canvas preview
  const posterRef = useRef(null);
  const handleDownloadPoster = () => {
    if (posterRef.current) {
      posterRef.current.download();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content">
        <PosterCanvas ref={posterRef} name={name} organization={organization} image={image ? image.preview : null} />
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