// Next.js API route for proxying requests to n8n webhook
// This helps avoid CORS issues when calling the webhook directly from the browser
const config = require('../../config');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract data from the request body
    const { message, name, goal, requestId } = req.body;

    // Validate required fields
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Get the webhook URL from config
    const webhookUrl = config.api.n8nWebhook;

    console.log(`Sending request to ${webhookUrl}`);

    // Forward the request to n8n
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        name: name || 'User',
        goal: goal || 'fitness',
        requestId: requestId || Date.now().toString(),
      }),
    });

    // Check if the request was successful
    if (!n8nResponse.ok) {
      console.error('n8n webhook error:', await n8nResponse.text());
      
      // Provide a fallback response if n8n fails
      return res.status(200).json({
        reply: "I'm sorry, I'm having trouble connecting to my AI service right now. Please try again later.",
        source: 'fallback'
      });
    }

    // Parse the response from n8n
    const data = await n8nResponse.json();

    // Check if the response has the expected format
    if (!data.reply) {
      console.error('Invalid response format from n8n:', data);
      
      // Format the response if it's missing the expected structure
      return res.status(200).json({
        reply: data.text || data.message || JSON.stringify(data),
        source: 'fallback'
      });
    }

    // Return the response from n8n
    return res.status(200).json({
      reply: data.reply,
      source: data.source || 'chatgpt'
    });
  } catch (error) {
    console.error('Error in chatgpt-proxy:', error);
    
    // Return a fallback response in case of error
    return res.status(200).json({
      reply: "I'm sorry, I encountered an error while processing your request. Please try again later.",
      source: 'fallback'
    });
  }
}