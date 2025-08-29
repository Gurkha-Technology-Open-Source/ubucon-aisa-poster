import React, { useState } from 'react';
import './App.css';
import PosterCanvas from './components/PosterCanvas';
import TextInput from './components/TextInput';
import ImageUpload from './components/ImageUpload';

function App() {
  const [name, setName] = useState('');
  const [organization, setOrganization] = useState('');
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownloadPoster = async () => {
    if (!image) {
      alert('Please select an image first!');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('organization', organization);
      formData.append('image', image); // image state now holds the file object

      const response = await fetch('http://localhost:5000/api/generate-poster', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const imageBlob = await response.blob();
      const url = URL.createObjectURL(imageBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'ubucon-poster.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (error) {
      console.error('Error generating poster:', error);
      alert('Failed to generate poster. Please check the console for more details.');
    } finally {
      setIsLoading(false);
    }
  };

  // Create a preview URL for the selected image
  const imagePreview = image ? URL.createObjectURL(image) : null;

  return (
    <div className="App">
      {isLoading && <div className="loading-overlay">Generating Poster...</div>}
      <header className="App-header">
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content">
        {/* Pass the preview URL to PosterCanvas */}
        <PosterCanvas name={name} organization={organization} image={imagePreview} />
        <div className="controls-container">
          <TextInput setName={setName} setOrganization={setOrganization} />
          {/* setImage will now receive the file object */}
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
