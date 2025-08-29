# Project Plan: UbuCon 2025 Participant Poster Generator

This document outlines the plan to create the UbuCon 2025 Participant Poster Generator, as detailed in the `prd.md`.

## Hosting & Tech Stack Considerations (Vercel)

This project will be deployed on Vercel's free "Hobby" tier. The following constraints must be considered:

- **Non-Commercial Use:** The Hobby tier is for personal and non-commercial projects. This should be acceptable for a community event like UbuCon.
- **Serverless Function Execution Limit (10s):** Backend operations must be fast. Our reliance on an external API for background removal is critical to staying within this limit.
- **Serverless Function Size (50MB):** We must be mindful of our backend dependencies, particularly native libraries like `sharp`, to avoid exceeding the size limit.

---

## Development Phases and Checklist

### Phase 1: Project Setup & Frontend Foundation

- [ ] **Initialize Project:** Set up a new React project using Create React App or Vite.
- [ ] **Folder Structure:** Organize folders for components, services, and assets.
- [ ] **UI Mockup:** Create the basic UI layout with placeholders for the poster, image upload, and text input fields.
- [ ] **Component Creation:**
    - [ ] `ImageUpload.js`: Component for handling file selection and preview.
    - [ ] `TextInput.js`: Component for name and organization input.
    - [ ] `PosterCanvas.js`: Component to display the poster template and render the user's photo and text.

### Phase 2: Backend Development

- [ ] **Setup Backend Server:** Initialize a Node.js project with Express.
- [ ] **Image Processing Service:**
    - [ ] Choose and integrate an image processing library (e.g., Sharp).
    - [ ] Implement logic to composite the user's photo onto the poster template.
- [ ] **Background Removal API:**
    - [ ] Research and select a background removal service (e.g., Remove.bg, Replicate AI).
    - [ ] Create an API endpoint to handle image uploads, call the background removal service, and return the processed image.
- [ ] **API Endpoints:**
    - [ ] `POST /api/generate-poster`: Accepts user data (image, name, organization), processes it, and returns the final poster.

### Phase 3: Integration & Finalization

- [ ] **Connect Frontend to Backend:**
    - [ ] Implement logic in the frontend to call the `/api/generate-poster` endpoint.
    - [ ] Display the generated poster preview to the user.
- [ ] **Implement Download Functionality:**
    - [ ] Add a "Download" button that allows the user to save the final poster as a PNG file.
- [ ] **Styling and Responsiveness:**
    - [ ] Apply final styling to match the UbuCon branding.
    - [ ] Ensure the application is responsive and works on different screen sizes.

### Phase 4: Testing & Deployment

- [ ] **Unit & Integration Testing:**
    - [ ] Write tests for critical components and services.
    - [ ] Perform end-to-end testing of the user flow.
- [ ] **Deployment:**
    - [ ] Choose a hosting provider for the frontend and backend (e.g., Vercel, Netlify, Heroku).
    - [ ] Deploy the application.
- [ ] **Documentation:**
    - [ ] Update `README.md` with instructions on how to run the project locally.
