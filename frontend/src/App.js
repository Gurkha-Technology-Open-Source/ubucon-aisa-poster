import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';

function App() {
  // State variables to hold user input and the generated poster
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null); // Stores the URL of the uploaded image for preview

  // Handles the poster generation and download process
  const handleDownloadPoster = async () => {
    const posterElement = document.querySelector('.poster-content');

    try {
      const canvas = await html2canvas(posterElement, {
        width: 1080,
        height: 1080,
        scale: 2, // Higher quality
        useCORS: true,
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ubucon-poster.png';
        link.click();
        URL.revokeObjectURL(url);
      });
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
        <PosterCanvas name={name} organization={organization} image={image} />
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