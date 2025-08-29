import React, { useState, useRef, useEffect } from 'react';
import domtoimage from 'dom-to-image';
import confetti from 'canvas-confetti';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';
import githubLogo from './assets/github-logo.png';
import posterTemplate from './assets/poster-template.png'; // Import the template

function App() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [appIsLoading, setAppIsLoading] = useState(true); // New state for preloader
  const [showConfettiMessage, setShowConfettiMessage] = useState(false); // New state for confetti message
  const posterRef = useRef();

  useEffect(() => {
    const img = new Image();
    img.src = posterTemplate;
    img.onload = () => {
      setAppIsLoading(false); // Once the template is loaded, hide preloader
    };
    img.onerror = () => {
      console.error("Failed to load poster template.");
      setAppIsLoading(false); // Hide preloader even on error
    };
  }, []);

  const handleDownloadPoster = () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    setIsLoading(true);
    const posterElement = posterRef.current;

    // Temporarily add print-view class to apply fixed styles
    posterElement.classList.add('print-view');

    // Use a small timeout to ensure CSS is applied before capture
    setTimeout(() => {
      domtoimage.toPng(posterElement, {
        width: 1080,
        height: 1080,
        style: {
          // Override any responsive styles during capture to ensure 1080x1080
          width: '1080px',
          height: '1080px',
          maxWidth: 'none',
          transform: 'scale(1)',
          transformOrigin: 'top left',
        }
      })
      .then(function (dataUrl) {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = 'ubucon-poster.png';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setShowConfettiMessage(true); // Show confetti and message
          confetti(); // Trigger confetti effect
      })
      .catch(function (error) {
          console.error('oops, something went wrong!', error);
          alert('There was an error generating your poster. Please try again.');
      })
      .finally(() => {
          // Revert changes
          posterElement.classList.remove('print-view');
          setIsLoading(false);
      });
    }, 50); // Small delay to allow CSS to render
  };

  const imagePreview = image ? URL.createObjectURL(image) : null;

  return (
    <div className="App">
      {appIsLoading && <div className="loading-overlay">Loading Application...</div>}
      <header className="App-header" style={{ display: appIsLoading || showConfettiMessage ? 'none' : 'block' }}>
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content" style={{ display: appIsLoading || showConfettiMessage ? 'none' : 'flex' }}>
        <PosterCanvas ref={posterRef} name={name} organization={organization} image={imagePreview} />
        <div className="controls-container">
          <TextInput setName={setName} setOrganization={setOrganization} />
          <ImageUpload setImage={setImage} />
          <button className="button" onClick={handleDownloadPoster} disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Download Poster'}
          </button>
        </div>
      </main>
      <footer className="App-footer" style={{ display: appIsLoading || showConfettiMessage ? 'none' : 'block' }}>
        <a href="https://github.com/Gurkha-Technology-Open-Source/ubucon-aisa-poster" target="_blank" rel="noopener noreferrer">
          <img src={githubLogo} alt="GitHub" />
          An open-source project by Gurkha Technology
        </a>
      </footer>
      {isLoading && <div className="loading-overlay">Generating Poster...</div>}

      {showConfettiMessage && (
        <div className="confetti-message-overlay">
          <div className="confetti-message-content">
            <h2>See you at the event!</h2>
            <p>Do submit a PR on GitHub to this project if you have some ideas or want to work on it more.</p>
            <a href="https://github.com/Gurkha-Technology-Open-Source/ubucon-aisa-poster" target="_blank" rel="noopener noreferrer" className="github-link">
              <img src={githubLogo} alt="GitHub" />
              Visit GitHub Project
            </a>
            <button className="button" onClick={() => setShowConfettiMessage(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
