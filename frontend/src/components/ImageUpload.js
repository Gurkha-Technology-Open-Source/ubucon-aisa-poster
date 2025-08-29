import React from 'react';

const ImageUpload = ({ setImage }) => {
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Create a URL for the selected file. This URL can be used as the src for an <img> tag
      // to display a preview of the image without uploading it to a server yet.
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
