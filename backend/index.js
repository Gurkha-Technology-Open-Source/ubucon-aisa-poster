require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const FormData = require('form-data');
const axios = require('axios');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/generate-poster', upload.single('image'), async (req, res) => {
  try {
    const { name, organization } = req.body;
    const imageBuffer = req.file.buffer;

    // Remove background using Clipdrop API
    const formData = new FormData();
    formData.append('image_file', imageBuffer, 'image.jpg');
    const clipdropResponse = await axios.post(
      'https://api.clipdrop.co/remove-background/v1',
      formData,
      {
        headers: {
          ...formData.getHeaders(),
          'x-api-key': process.env.CLIPDROP_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    const imageWithoutBg = clipdropResponse.data;

    const poster = await sharp('../frontend/src/assets/poster-template.png')
      .composite([
        { input: imageWithoutBg, gravity: 'northwest', left: 94, top: 307 },
        {
          input: {
            text: {
              text: `<span foreground="white">${name}</span>`,
              font: 'Ubuntu',
              rgba: true,
              dpi: 72,
            },
          },
          top: 540,
          left: 94,
        },
        {
          input: {
            text: {
              text: `<span foreground="white">${organization}</span>`,
              font: 'Ubuntu',
              rgba: true,
              dpi: 72,
            },
          },
          top: 580, // Adjust as needed
          left: 94,
        },
      ])
      .toBuffer();

    res.set('Content-Type', 'image/png');
    res.send(poster);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating poster');
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
