import React from 'react';

const TextInput = ({ setName, setOrganization }) => {
  return (
    <div className="control-group">
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" onChange={(e) => setName(e.target.value)} />
      <label htmlFor="organization">Organization/Title:</label>
      <input type="text" id="organization" onChange={(e) => setOrganization(e.target.value)} />
    </div>
  );
};

export default TextInput;
