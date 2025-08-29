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

  // Handles the poster generation and download process
  const handleDownloadPoster = async () => {
    const posterElement = document.querySelector('.poster-content');

    // Store original styles
    const originalWidth = posterElement.style.width;
    const originalHeight = posterElement.style.height;
    const originalPaddingBottom = posterElement.style.paddingBottom;

    // Get text elements for style backup
    const textOverlay = posterElement.querySelector('.text-overlay');
    const organization = posterElement.querySelector('.organization');
    const originalTextFontSize = textOverlay?.style.fontSize;
    const originalOrgFontSize = organization?.style.fontSize;

    try {
      // Temporarily set fixed dimensions for high-quality capture
      posterElement.style.width = '1080px';
      posterElement.style.height = '1080px';
      posterElement.style.paddingBottom = '0';

      // Convert vw font sizes to px for accurate capture
      if (textOverlay) textOverlay.style.fontSize = '24px';
      if (organization) organization.style.fontSize = '18px';

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
        // Force font loading
        onclone: (clonedDoc) => {
          const style = clonedDoc.createElement('style');
          style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');
            * { font-family: 'Ubuntu', Arial, sans-serif !important; }
          `;
          clonedDoc.head.appendChild(style);
        }
      });

      // Restore original styles
      posterElement.style.width = originalWidth;
      posterElement.style.height = originalHeight;
      posterElement.style.paddingBottom = originalPaddingBottom;
      if (textOverlay) textOverlay.style.fontSize = originalTextFontSize;
      if (organization) organization.style.fontSize = originalOrgFontSize;

      canvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ubucon-poster.png';
        link.click();
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      // Restore styles even if there's an error
      posterElement.style.width = originalWidth;
      posterElement.style.height = originalHeight;
      posterElement.style.paddingBottom = originalPaddingBottom;
      if (textOverlay) textOverlay.style.fontSize = originalTextFontSize;
      if (organization) organization.style.fontSize = originalOrgFontSize;
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