import React, { forwardRef } from 'react';
import posterTemplate from '../assets/poster-template.png';

const PosterCanvas = forwardRef(({ name, organization, image }, ref) => {
  return (
    <div className="poster-container" ref={ref}>
      <div className="poster-content">
        <img src={posterTemplate} alt="UbuCon Asia 2025 Poster Template" className="poster-template-img" crossOrigin="anonymous" />
        <div className="overlay-elements">
          {image && <img src={image} alt="Profile" className="profile-image" crossOrigin="anonymous" />}
          <div className="text-overlay">
            <div className="name">{name}</div>
            <div className="organization">{organization}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default PosterCanvas;
