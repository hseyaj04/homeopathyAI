
# HomeopathyAI

HomeopathyAI is a modern, AI-powered chat interface designed to assist certified homeopathic doctors in analyzing patient cases. By leveraging the power of the Google Gemini API, this tool can process patient history provided as text or an image and generate a structured, insightful analysis to support the doctor's decision-making process.

**Disclaimer:** This is an assistive tool for certified medical professionals and is not a substitute for professional medical judgment. The AI-generated analysis should be treated as a suggestion to be critically evaluated by the doctor.

## ✨ Key Features

-   **AI-Powered Case Analysis:** Utilizes the Google Gemini API to provide a deep analysis of patient history, including symptoms, timelines, and modalities.
-   **Structured & Actionable Output:** The AI response is organized into clear, collapsible sections:
    -   **Patient History Summary:** A concise overview of the case.
    -   **Suggested Follow-up Questions:** Helps the doctor probe for more precise information.
    -   **Potential Remedy Analysis:** A list of suggested remedies, each presented on a detailed card.
-   **In-Depth Remedy Cards:** Each remedy suggestion includes:
    -   A clear **Rationale**.
    -   Suggested **Potency** and **Dosage**.
    -   A list of **Key Matching Symptoms**.
    -   An AI-assessed **Match Strength** (High, Medium, Low) for quick evaluation.
-   **Dual Input Methods:** Accepts both typed patient notes and uploaded images of medical records.
-   **Modern "Liquid Glass" UI:** A clean, professional interface with glassmorphism effects for a modern aesthetic.
-   **Light & Dark Modes:** A theme switcher allows users to choose their preferred visual mode for optimal comfort.
-   **Copy to Clipboard:** Easily copy the summary, questions, or remedy details to integrate into patient records or other software.
-   **Responsive Design:** Ensures a seamless experience across different screen sizes.

## 🛠️ Technology Stack & Project Setup

This project is built as a modern web application using Vite, React, and Tailwind CSS.

-   **Build Tool:** [**Vite**](https://vitejs.dev/) - A blazing-fast frontend build tool that provides a lightning-quick development experience.
-   **Frontend:**
    -   [**React**](https://reactjs.org/) - For building the user interface.
    -   [**TypeScript**](https://www.typescriptlang.org/) - For type safety and improved developer experience.
    -   [**Tailwind CSS**](https://tailwindcss.com/) - For styling the application with a utility-first approach.
-   **AI Model:**
    -   **Google Gemini API (`@google/genai`)**: Powers the core analysis functionality.

---

### Local Development Setup

To run this project on your local machine, follow these steps.

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/homeopathyAI.git
cd homeopathyAI
```

**2. Install Dependencies**
```bash
npm install
```

**3. Set Up Environment Variables**
You need to provide your Google Gemini API key. Create a file named `.env.local` in the root of your project directory.
```
touch .env.local
```
Open the `.env.local` file and add your API key in the following format. For Vite, the variable **must** be prefixed with `VITE_`.
```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

**4. Run the Development Server**
```bash
npm run dev
```
This will start the Vite development server, and you can view your application by opening `http://localhost:5173` (or the URL provided in your terminal) in your browser.

---

### 🚀 Deployment on Vercel

**1. Import Project**
- Connect your GitHub account to Vercel and import the `HomeopathyAI` repository.

**2. Configure Build Settings**
- Vercel will automatically detect Vite and set the correct build command (`npm run build`) and output directory (`dist`). You don't need to change anything here.

**3. Add Environment Variable**
- In your Vercel project settings, navigate to the **"Environment Variables"** section.
- Add a new variable with the following name and your API key as the value:
  - **Name:** `VITE_GEMINI_API_KEY`
  - **Value:** `your_gemini_api_key_here`

**4. Deploy**
- Click the "Deploy" button. Vercel will build and deploy your application, providing a live URL once it's done.

---
## 📂 File Structure

The project is organized into a standard Vite + React structure:
```
/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── ChatMessage.tsx   # Renders chat bubbles and the structured AI analysis.
│   │   ├── ImageUpload.tsx   # The main chat input bar for text and file uploads.
│   │   └── icons.tsx         # A library of SVG icons used throughout the app.
│   ├── services/
│   │   └── geminiService.ts  # Handles all API calls to the Gemini model.
│   ├── App.tsx               # Main application component, managing state and layout.
│   ├── index.css             # Main CSS file for Tailwind imports.
│   ├── index.tsx             # The main entry point for the React application.
│   └── types.ts              # Shared TypeScript type definitions.
├── .env.local.example        # Example environment file.
├── index.html                # The HTML entry point for Vite.
├── package.json              # Project dependencies and scripts.
├── vite.config.ts            # Vite configuration.
└── tailwind.config.js        # Tailwind CSS configuration.
```
