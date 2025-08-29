import React from 'react';
import posterTemplate from '../assets/poster-template.png';

const PosterCanvas = ({ name, organization, image }) => {
  return (
    <div className="poster-container">
      <div className="poster-content">
        <img src={posterTemplate} alt="UbuCon Asia 2025 Poster Template" className="poster-template-img" />
        <div className="overlay-elements">
          {image && <img src={image} alt="Profile" className="profile-image" />}
          <div className="text-overlay">
            <div className="name">{name}</div>
            <div className="organization">{organization}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PosterCanvas;
