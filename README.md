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

## 🚀 How to Use

1.  **Start the Conversation:** The application opens with a welcome message from the AI assistant.
2.  **Input Patient Data:**
    -   **Text:** Type patient notes, symptoms, or case history directly into the text area at the bottom.
    -   **Image:** Click the circular `+` button to select and upload an image of a patient's written history or lab report.
3.  **Send for Analysis:** Once your text or image is ready, click the green "Send" button.
4.  **Review the Analysis:** The AI will process the information and display a structured response. A "typing" indicator will appear while the model is thinking.
5.  **Interact with the Results:**
    -   Click on the title of any section (e.g., "Patient History Summary") to expand or collapse it.
    -   Use the "Copy" button within each section to copy its content to your clipboard.
    -   Review the remedy cards, paying attention to the match strength and key symptoms.

## 🛠️ Technology Stack

-   **Frontend Framework:** **React** with **TypeScript**.
-   **Build Tool:** **Vite** for a fast, modern development and build process.
-   **Styling:** **Tailwind CSS** for a utility-first styling approach.
-   **AI Model:** **Google Gemini API (`@google/genai`)** powers the core analysis functionality.
-   **Markdown Parsing:** **Marked** for rendering any non-JSON responses.

## 📦 Local Development

1.  **Clone the repository.**
2.  **Install dependencies:** `npm install`
3.  **Create a `.env` file** in the root directory and add your Gemini API key. The name **must** start with `VITE_`.
    ```
    VITE_GEMINI_API_KEY=your_api_key_here
    ```
4.  **Start the development server:** `npm run dev`

##  Vercel Deployment

Deploying this application to Vercel is straightforward.

1.  **Push to GitHub:** Ensure your latest code is pushed to your GitHub repository.
2.  **Import Project in Vercel:**
    -   Sign up for a free account on [Vercel](https://vercel.com) and connect your GitHub account.
    -   On your dashboard, click "Add New... -> Project" and import your `HomeopathyAI` repository.
3.  **Configure Project:**
    -   Vercel will automatically detect that you're using **Vite** and will pre-fill the correct build settings. You can leave these as they are.
4.  **Add Environment Variable (Crucial Step):**
    -   Expand the "Environment Variables" section.
    -   Add a new variable with the **Name** `VITE_GEMINI_API_KEY`. (Note the `VITE_` prefix is required).
    -   In the **Value** field, paste your secret Google Gemini API key.
    -   Vercel will keep this key secure.
5.  **Deploy:**
    -   Click the "Deploy" button and wait for the build process to complete. Your site will be live!

## 📂 Project Structure

The project is organized into a standard Vite + React structure:

```
/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── services/          # API services (e.g., geminiService.ts)
│   ├── App.tsx            # Main application component
│   ├── index.css          # Main CSS file for Tailwind imports
│   ├── index.tsx          # React application entry point
│   └── types.ts           # TypeScript type definitions
├── .env.example           # Example environment file
├── .gitignore
├── index.html             # Main HTML entry file
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # This file
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.ts         # Vite build tool configuration
```