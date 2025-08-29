import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';
import githubLogo from './assets/github-logo.png';

function App() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const posterRef = useRef();

  const handleDownloadPoster = () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    setIsLoading(true);
    const posterElement = posterRef.current;
    posterElement.classList.add('print-view');

    // Add a small delay to allow the browser to apply the new styles
    setTimeout(() => {
      html2canvas(posterElement, {
        useCORS: true,
      }).then(canvas => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'ubucon-poster.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }).catch(error => {
        console.error('Error generating poster:', error);
        alert('There was an error generating your poster. Please try again.');
      }).finally(() => {
        posterElement.classList.remove('print-view');
        setIsLoading(false);
      });
    }, 200); // 200ms delay
  };

  const imagePreview = image ? URL.createObjectURL(image) : null;

  return (
    <div className="App">
      {isLoading && <div className="loading-overlay">Generating Poster...</div>}
      <header className="App-header">
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content">
        <PosterCanvas ref={posterRef} name={name} organization={organization} image={imagePreview} />
        <div className="controls-container">
          <TextInput setName={setName} setOrganization={setOrganization} />
          <ImageUpload setImage={setImage} />
          <button className="button" onClick={handleDownloadPoster} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Download Poster'}
          </button>
        </div>
      </main>
      <footer className="App-footer">
        <a href="https://github.com/Gurkha-Technology-Open-Source/ubucon-aisa-poster" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub" />
          An open-source project by Gurkha Technology
        </a>
      </footer>
    </div>
  );
}

export default App;
