import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';
import posterTemplate from './assets/poster-template.png';

function App() {
  // State variables to hold user input and the generated poster
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null); // Stores the URL of the uploaded image for preview
  const [isLoading, setIsLoading] = useState(false);

  // Handles the poster generation and download process
  const handleDownloadPoster = async () => {
    setIsLoading(true);
    const posterElement = document.querySelector('.poster-content');
    posterElement.classList.add('print-view');

    try {
      // Ensure fonts are loaded
      await document.fonts.ready;

      const canvas = await html2canvas(posterElement, {
        width: 1080,
        height: 1080,
        scale: 1,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ubucon-poster.png';
        link.click();
        URL.revokeObjectURL(url);
        posterElement.classList.remove('print-view');
        setIsLoading(false);
      });
    } catch (error) {
      console.error('Error generating poster:', error);
      posterElement.classList.remove('print-view');
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      {isLoading && <div className="loading-overlay">Generating Poster...</div>}
      <header className="App-header">
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content">
        <PosterCanvas name={name} organization={organization} image={image} />
        <div className="controls-container">
          <TextInput setName={setName} setOrganization={setOrganization} />
          <ImageUpload setImage={setImage} />
          <button className="button" onClick={handleDownloadPoster} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Download Poster'}
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;