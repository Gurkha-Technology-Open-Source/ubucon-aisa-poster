require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors'); // Middleware to enable Cross-Origin Resource Sharing
const multer = require('multer'); // Middleware for handling multipart/form-data (file uploads)
const sharp = require('sharp'); // High-performance Node.js image processing library
const FormData = require('form-data'); // For creating multipart/form-data requests
const axios = require('axios'); // Promise-based HTTP client for the browser and node.js

const app = express();
const port = 5000;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON request bodies

// Configure multer to store uploaded files in memory as a Buffer
const upload = multer({ storage: multer.memoryStorage() });

// API endpoint for generating the poster
app.post('/api/generate-poster', upload.single('image'), async (req, res) => {
  try {
    const { name, organization } = req.body;
    const imageBuffer = req.file.buffer; // The uploaded image as a Buffer

    // --- Image Composition using Sharp ---
    // Load the base poster template and composite the elements onto it
    const poster = await sharp('./frontend/src/assets/poster-template.png')
      .resize(1080, 1080) // Resize the canvas to 1080x1080
      .composite([
        // Composite the user's image onto the poster
        {
          input: await sharp(imageBuffer).resize(400, 400).toBuffer(), // Resize user image
          gravity: 'northwest',
          left: 120, // Adjusted for 1080px canvas
          top: 500, // Adjusted for 1080px canvas
        },
        // Composite the user's name text vertically
        {
          input: {
            text: {
              text: `<span foreground="white" gravity="south">${name}</span>`,
              font: 'Ubuntu 36',
              rgba: true,
            },
          },
          top: 150,
          left: 120,
        },
        // Composite the user's organization/title text vertically
        {
          input: {
            text: {
              text: `<span foreground="white" gravity="south">${organization}</span>`,
              font: 'Ubuntu 28',
              rgba: true,
            },
          },
          top: 150,
          left: 170,
        },
      ])
      .toBuffer(); // Output the final composite image as a Buffer

    res.set('Content-Type', 'image/png'); // Set response header to indicate PNG image
    res.send(poster); // Send the generated poster image
  } catch (error) {
    console.error('Error generating poster:', error);
    res.status(500).send('Error generating poster');
    // TODO: Implement more specific error handling and user feedback
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
