# Fitness AI Coach

A web-based fitness coaching application that uses ChatGPT to provide personalized fitness advice and workout plans.

## Features

- Interactive chat interface with AI fitness coach
- Personalized responses based on user's name and fitness goals
- Integration with ChatGPT through n8n workflow
- Responsive design for desktop and mobile devices

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/guvenalex1/gym_coach.git
   cd gym_coach
   ```

2. Open the website:
   - Simply open the `public/index.html` file in your browser
   - Or serve the files using a local server:
     ```
     npx serve public
     ```

## n8n Integration

This application integrates with ChatGPT through an n8n workflow. To set up the integration:

1. Make sure your n8n workflow is properly configured as described in `public/n8n-workflow-fix.html`
2. Verify the connection using the test tools:
   - `public/test-n8n-connection.html` - Simple test for direct connection
   - `public/verify-chatgpt-connection.html` - Advanced test with verification checks

## Files

- `public/index.html` - Main landing page
- `public/bot.html` - AI Coach chat interface
- `public/test-n8n-connection.html` - Tool to test n8n webhook connection
- `public/verify-chatgpt-connection.html` - Tool to verify ChatGPT integration
- `public/n8n-workflow-fix.html` - Guide for fixing n8n workflow issues
- `public/chatgpt-integration-summary.html` - Summary of the ChatGPT integration

## License

MIT