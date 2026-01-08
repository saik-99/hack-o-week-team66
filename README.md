# Institute FAQ Bot (TechFlow Academy)

A smart, hybrid FAQ chatbot designed for educational institutes. It uses a **Rule-Based Engine** for instant, accurate answers to common questions (like fees, timings, and contact info) and **Google Gemini AI** as a fallback for complex or conversational queries.

## Features

- **⚡ Instant Answers**: Strict pattern matching for defined keywords ensures 100% accuracy for critical info.
- **🧠 AI Fallback**: Integrates `gemini-3-flash-preview` to handle unstructured queries gracefully.
- **💬 Hybrid Interface**: Seamless chat UI with typing indicators and quick reply buttons.
- **🎨 Modern Design**: Built with React and Tailwind CSS.

## Project Structure

- `constants.ts`: Contains the `FAQ_DATABASE` (rules) and Institute configuration.
- `services/ruleEngine.ts`: Logic for keyword matching.
- `services/geminiService.ts`: Integration with Google GenAI SDK.
- `App.tsx`: Main chat interface logic.

## Getting Started

### Prerequisites

- Node.js installed (optional, for running a local server).
- A Google GenAI API Key.

### Running Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/institute-faq-bot.git
   cd institute-faq-bot
   ```

2. **Serve the application**
   Since this project uses ES Modules directly in the browser, you need to serve it using a local HTTP server (opening `index.html` directly won't work due to CORS).

   Using `npx` (easiest):
   ```bash
   npx http-server .
   ```

   Or using Python:
   ```bash
   python3 -m http.server
   ```

3. **Open in Browser**
   Navigate to `http://localhost:8080` (or the port shown in your terminal).

## Configuration

To update the FAQ answers (e.g., Fees, Contact Info), edit the `FAQ_DATABASE` array in `constants.ts`.

```typescript
export const FAQ_DATABASE: FAQRule[] = [
  {
    id: 'contact',
    category: 'Contact',
    keywords: ['email', 'phone'],
    answer: "Contact us at..."
  },
  // ...
];
```
