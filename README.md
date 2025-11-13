
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

-   **Frontend:**
    -   **React:** For building the user interface.
    -   **TypeScript:** For type safety and improved developer experience.
    -   **Tailwind CSS:** For styling the application with a utility-first approach.
-   **AI Model:**
    -   **Google Gemini API (`@google/genai`):** Powers the core analysis functionality. The `gemini-2.5-flash` model is used with a specific system instruction and a JSON response schema to ensure structured output.
-   **Markdown Parsing:**
    -   **Marked:** Used as a fallback to render any non-JSON responses (like welcome or error messages) from the model.

## 📂 File Structure

The project is organized into a modular structure for clarity and maintainability:

```
/
├── public/
├── src/
│   ├── components/
│   │   ├── ChatMessage.tsx   # Renders chat bubbles and the structured AI analysis.
│   │   ├── ImageUpload.tsx   # The main chat input bar for text and file uploads.
│   │   └── icons.tsx         # A library of SVG icons used throughout the app.
│   ├── services/
│   │   └── geminiService.ts  # Handles all API calls and logic for interacting with the Gemini model.
│   ├── App.tsx               # Main application component, managing state, themes, and message flow.
│   ├── index.tsx             # The main entry point for the React application.
│   └── types.ts              # Contains shared TypeScript type definitions.
├── index.html                # The main HTML file.
├── metadata.json             # Application metadata.
└── README.md                 # This file.
```
