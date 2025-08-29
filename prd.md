# Product Requirement Document (PRD)

## Project Title: UbuCon 2025 Participant Poster Generator
**Prepared By:** [Your Name]  
**Date:** [Insert Date]

---

## 1. Objective

Enable participants of UbuCon Asia 2025 to easily generate a personalized event promotion banner by uploading their photo, adding their name, and specifying their organization or title. The generated image should maintain the official event branding while allowing for participant customization.

---

## 2. Key Features

### 2.1 Image Upload
- Users can upload a profile photo.
- Automatic background removal will be applied to maintain consistency.
- Accepted formats: `.jpg`, `.png`, `.jpeg`.
- Maximum size: 5MB.

### 2.2 Placement of Photo
- The participant’s photo will be placed on the left side of the poster.
- **Positioning rule:**
  - Anchor point: bottom edge of the photo must not go below `y = 307px`.
  - The photo should be horizontally aligned with the vertical orange bar (left margin).

### 2.3 Participant Details (Name & Organization/Title)
- **Text input fields:**
  - Full Name (mandatory).
  - Organization/Title (optional).
- **Placement:**
  - Text starts at `x = 94px` and `y = 540px`.
  - Aligned vertically downwards inside the orange bar.
  - Font: same as event banner (Ubuntu font preferred).
  - Color: White text.

### 2.4 Event Branding (Static Elements)
The following elements should remain unchanged:
- Event name & logo (top-right).
- Event date & location (bottom-right).
- Taglines (“Meet me at the event”, hashtags, etc.).
- Grid background and color scheme.

### 2.5 Export Options
- Final banner export in PNG format.
- Resolution: same as template (original banner dimensions).
- Option to download or share directly (optional, phase 2).

---

## 3. User Flow
1. User visits the banner generator page.
2. User uploads their profile photo.
3. System removes the background automatically.
4. User enters Name and Organization/Title.
5. Banner preview is generated.
6. User downloads the final image in PNG format.

---

## 4. Technical Requirements

### 4.1 Frontend
- Framework: React (preferred) or Vue.js.
- File upload with preview.
- Text input with live rendering on the banner.

### 4.2 Backend
- API for background removal (options: Remove.bg API, Replicate AI models, or custom ML service).
- Image processing: Node.js (Sharp library) or Python (Pillow).

### 4.3 Storage
- Temporary image storage for processing.
- No long-term storage of user images (privacy-friendly).

---

## 5. Constraints & Assumptions
- Template dimensions and design are fixed.
- Only text and photo customization allowed.
- Participants are responsible for correct spelling of their name/title.

---

## 6. Future Enhancements
- Option to adjust text font size if names are long.
- Social media sharing integration.
- Multiple layout options (portrait/square).
- Multi-language support.

---

## 7. Acceptance Criteria
- [ ] User can upload a photo and see background removed.
- [ ] User’s name and organization/title appear correctly at specified coordinates.
- [ ] Banner maintains event branding.
- [ ] Exported PNG has the same resolution as the template.
- [ ] Final output is ready for social media sharing without extra edits.