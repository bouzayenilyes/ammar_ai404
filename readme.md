# ChatTounsi

A modern, responsive chat application inspired by ChatGPT, built with vanilla JavaScript and powered by Google's Gemini AI API.

## Features

- **Clean, Modern UI**: Google-inspired design with dark theme
- **Real-time Chat**: Interactive chat interface with typing indicators
- **Gemini AI Integration**: Powered by Google's Gemini 2.0 Flash model
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Typing Animation**: Realistic typing effect for AI responses
- **Auto-resizing Input**: Text area that grows with your message

## Getting Started

### Prerequisites

- A modern web browser
- Google Gemini API key (get one from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. Clone or download this repository
2. Open `script.js` and replace the API key:
   ```javascript
   this.apiKey = "YOUR_GEMINI_API_KEY_HERE";
   ```
3. Open `index.html` in your web browser

### Usage

1. Type your message in the input field at the bottom
2. Press Enter or click the send button
3. Wait for ChatTounsi to respond with AI-generated content
4. Continue the conversation naturally

## Project Structure

```
├── index.html      # Main HTML file
├── style.css       # Styling and responsive design
├── script.js       # Core application logic and API integration
└── readme.md       # This file
```

## Technical Details

### Built With

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox and animations
- **Vanilla JavaScript**: No frameworks, pure ES6+ JavaScript
- **Google Gemini API**: AI-powered responses

### Key Components

- `Chattounsi` class: Main application controller
- Message handling: User input processing and display
- API integration: Gemini API calls with error handling
- UI animations: Typing indicators and smooth scrolling

## API Configuration

The application uses Google's Gemini 2.0 Flash model with the following settings:

- **Temperature**: 0.7 (balanced creativity)
- **Top K**: 40
- **Top P**: 0.95
- **Max Output Tokens**: 1024
- **Safety Settings**: Medium and above blocking for harmful content

## Browser Support

- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).