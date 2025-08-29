import React from 'react';

const ImageUpload = ({ setImage }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="control-group">
      <label htmlFor="profile-pic">Profile Picture:</label>
      <input type="file" id="profile-pic" accept="image/png, image/jpeg" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUpload;
