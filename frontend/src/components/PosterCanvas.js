import React from 'react';
import posterTemplate from '../assets/poster-template.png';

const PosterCanvas = ({ name, organization, image, generatedPoster }) => {
  return (
    <div className="poster-container">
      {/* Conditionally render the generated poster or the live preview */}
      {generatedPoster ? (
        <img src={generatedPoster} alt="Generated Poster" className="poster-template" />
      ) : (
        <div className="poster-content">
          <img src={posterTemplate} alt="UbuCon Asia 2025 Poster Template" className="poster-template-img" />
          {/* Overlay elements (image and text) are positioned relative to the poster-content */}
          <div className="overlay-elements">
            {image && <img src={image} alt="Profile" className="profile-image" />}
            <div className="text-overlay">
              <div className="name">{name}</div>
              <div className="organization">{organization}</div>
            </div>
          </div>
        </div>
      )}
      {/* Show download button only when a poster has been generated */}
      {generatedPoster && (
        <a href={generatedPoster} download="ubucon-poster.png" className="button download-button">
          Download Poster
        </a>
      )}
    </div>
  );
};

export default PosterCanvas;
