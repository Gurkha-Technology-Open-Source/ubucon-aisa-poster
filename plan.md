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

- [x] **Initialize Project:** Set up a new React project using Create React App or Vite.
- [x] **Folder Structure:** Organize folders for components, services, and assets.
- [x] **UI Mockup:** Create the basic UI layout with placeholders for the poster, image upload, and text input fields.
- [x] **Component Creation:**
    - [x] `ImageUpload.js`: Component for handling file selection and preview.
    - [x] `TextInput.js`: Component for name and organization input.
    - [x] `PosterCanvas.js`: Component to display the poster template and render the user's photo and text.

### Phase 2: Backend Development

- [x] **Setup Backend Server:** Initialize a Node.js project with Express.
- [x] **Image Processing Service:**
    - [x] Choose and integrate an image processing library (e.g., Sharp).
    - [x] Implement logic to composite the user's photo onto the poster template.
- [x] **Background Removal API:**
    - [x] Research and select a background removal service (e.g., Remove.bg).
    - [x] Create an API endpoint to handle image uploads, call the background removal service, and return the processed image.
- [x] **API Endpoints:**
    - [x] `POST /api/generate-poster`: Accepts user data (image, name, organization), processes it, and returns the final poster.

### Phase 3: Integration & Finalization

- [x] **Connect Frontend to Backend:**
    - [x] Implement logic in the frontend to call the `/api/generate-poster` endpoint.
    - [x] Display the generated poster preview to the user.
- [x] **Implement Download Functionality:**
    - [x] Add a "Download" button that allows the user to save the final poster as a PNG file.
- [x] **Styling and Responsiveness:**
    - [x] Apply initial styling and responsiveness. Further refinement might be needed.

### Phase 4: Testing & Deployment

- [ ] **Unit & Integration Testing:**
    - [ ] Write tests for critical components and services.
    - [ ] Perform end-to-end testing of the user flow.
- [x] **Deployment:**
    - [x] Choose a hosting provider for the frontend and backend (Vercel).
    - [x] Deploy the application (initial deployment, with Vercel root directory configured).
- [x] **Documentation:**
    - [x] Update `README.md` with instructions on how to run the project locally.
