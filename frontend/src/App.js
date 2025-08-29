import React, { useState } from 'react';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';
import posterTemplate from './assets/poster-template.png';

function App() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPoster = () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    setIsLoading(true);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const template = new Image();
    template.crossOrigin = 'anonymous';
    template.src = posterTemplate;

    template.onload = () => {
      canvas.width = template.width;
      canvas.height = template.height;
      ctx.drawImage(template, 0, 0);

      const userImage = new Image();
      userImage.crossOrigin = 'anonymous';
      userImage.src = URL.createObjectURL(image);

      userImage.onload = () => {
        const imageX = canvas.width / 2;
        const imageY = canvas.height * 0.415;
        const imageWidth = canvas.width * 0.2;
        const imageHeight = imageWidth; 
        
        ctx.save();
        ctx.beginPath();
        ctx.arc(imageX, imageY, imageWidth / 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        
        ctx.drawImage(userImage, imageX - imageWidth / 2, imageY - imageHeight / 2, imageWidth, imageHeight);
        
        ctx.restore();

        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        
        ctx.font = 'bold 48px sans-serif';
        ctx.fillText(name, canvas.width / 2, canvas.height * 0.85);
        
        ctx.font = '32px sans-serif';
        ctx.fillText(organization, canvas.width / 2, canvas.height * 0.9);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'ubucon-poster.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setIsLoading(false);
      };

      userImage.onerror = () => {
        alert('Failed to load the selected image.');
        setIsLoading(false);
      };
    };

    template.onerror = () => {
      alert('Failed to load the poster template.');
      setIsLoading(false);
    };
  };

  const imagePreview = image ? URL.createObjectURL(image) : null;

  return (
    <div className="App">
      {isLoading && <div className="loading-overlay">Generating Poster...</div>}
      <header className="App-header">
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content">
        <PosterCanvas name={name} organization={organization} image={imagePreview} />
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
