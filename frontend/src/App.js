import './App.css';
import posterTemplate from './assets/poster-template.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>UbuCon Asia 2025 Poster Generator</h1>
      </header>
      <main className="main-content">
        <div className="poster-container">
          <img src={posterTemplate} alt="UbuCon Asia 2025 Poster Template" className="poster-template" />
        </div>
        <div className="controls-container">
          <h2>Customize Your Poster</h2>
          <div className="control-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" />
          </div>
          <div className="control-group">
            <label htmlFor="organization">Organization/Title:</label>
            <input type="text" id="organization" />
          </div>
          <div className="control-group">
            <label htmlFor="profile-pic">Profile Picture:</label>
            <input type="file" id="profile-pic" accept="image/png, image/jpeg" />
          </div>
          <button className="button">Generate Poster</button>
        </div>
      </main>
    </div>
  );
}

export default App;