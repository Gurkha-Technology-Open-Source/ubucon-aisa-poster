import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';
import posterTemplate from './assets/poster-template.png';

import React, { useState } from 'react';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';
import posterTemplate from './assets/poster-template.png'; // Import the template

function App() {
  // State variables
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Download handler using Canvas API for pixel-perfect rendering
  const handleDownloadPoster = async () => {
    setIsLoading(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      // 1. Draw Background Template
      const template = new Image();
      template.src = posterTemplate;
      template.crossOrigin = 'anonymous';
      await new Promise((resolve) => {
        template.onload = resolve;
      });
      ctx.drawImage(template, 0, 0, 1080, 1080);

      // 2. Draw User Image
      if (image) {
        const userImage = new Image();
        userImage.src = image;
        userImage.crossOrigin = 'anonymous';
        await new Promise((resolve) => {
          userImage.onload = resolve;
        });
        // Calculations based on CSS: top 60%, left 7.2%, width 50% (max 400px), height 40%
        const imgX = 1080 * 0.072; // 77.76px
        const imgY = 1080 * 0.6;   // 648px
        const imgW = Math.min(1080 * 0.5, 400); // 400px
        const imgH = 1080 * 0.4;   // 432px
        ctx.drawImage(userImage, imgX, imgY, imgW, imgH);
      }

      // 3. Draw Text
      ctx.fillStyle = 'white';
      ctx.textAlign = 'left';
      
      // Name (Bold, 24px, at 10% top, 10% left)
      ctx.font = 'bold 24px Ubuntu, sans-serif';
      const textX = 1080 * 0.1; // 1080px
      let currentY = 1080 * 0.1; // 108px
      
      if (name) {
        for (let i = 0; i < name.length; i++) {
          ctx.fillText(name[i], textX, currentY);
          currentY += 24; // Move down for next character
        }
      }

      // Organization (Regular, 18px, below name)
      ctx.font = '18px Ubuntu, sans-serif';
      currentY += 10; // Add a small gap
      if (organization) {
        for (let i = 0; i < organization.length; i++) {
          ctx.fillText(organization[i], textX, currentY);
          currentY += 18; // Move down for next character
        }
      }

      // 4. Trigger Download
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ubucon-poster.png';
      link.click();

    } catch (error) {
      console.error('Error generating poster:', error);
    } finally {
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

export default App;