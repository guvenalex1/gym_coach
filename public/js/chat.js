/**
 * Fitness AI Coach - Chat Functionality
 * Handles the chat interface and API communication
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get config from global object or use defaults
    const config = window.fitnessCoachConfig || {
        api: {
            n8nWebhook: 'https://guvenalex1.app.n8n.cloud/webhook/fitness-bot'
        }
    };

    // DOM Elements
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const nameInput = document.getElementById('name');
    const goalSelect = document.getElementById('goal');
    const loading = document.getElementById('loading');
    
    // Webhook URL for n8n
    const webhookUrl = config.api.n8nWebhook;
    
    /**
     * Add a message to the chat UI
     * @param {string} content - The message content
     * @param {boolean} isUser - Whether the message is from the user
     * @param {string|null} source - The source of the bot's response (chatgpt or fallback)
     */
    function addMessage(content, isUser, source = null) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.textContent = content;
        
        // Add source badge if provided
        if (source && !isUser) {
            const badge = document.createElement('span');
            badge.className = source === 'chatgpt' ? 'badge badge-chatgpt' : 'badge badge-fallback';
            badge.textContent = source === 'chatgpt' ? 'ChatGPT' : 'Fallback';
            messageContent.appendChild(badge);
        }
        
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    /**
     * Send message to the API
     * @param {string} message - The user's message
     */
    async function sendMessage(message) {
        const name = nameInput.value.trim();
        const goal = goalSelect.value;
        
        // Show loading indicator
        loading.style.display = 'block';
        
        try {
            // Use a CORS proxy service since we're running in a static file server
            // This is a public CORS proxy - in production, you should use your own server
            const corsProxy = 'https://corsproxy.io/?';
            const targetUrl = encodeURIComponent(webhookUrl);
            const proxyUrl = corsProxy + targetUrl;
            
            console.log('Sending request through CORS proxy');
            const response = await fetch(proxyUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    name,
                    goal,
                    requestId: Date.now().toString()
                })
            });
            
            const data = await response.json();
            
            // Add bot response to chat
            if (data.reply) {
                addMessage(data.reply, false, data.source || 'chatgpt');
            } else if (data.text) {
                // Handle case where n8n returns text instead of reply
                addMessage(data.text, false, 'chatgpt');
            } else {
                addMessage('Sorry, I encountered an error. Please try again.', false);
            }
        } catch (error) {
            console.error('Error:', error);
            addMessage('Sorry, I encountered an error connecting to the AI service. Please try again later.', false, 'fallback');
        } finally {
            // Hide loading indicator
            loading.style.display = 'none';
        }
    }
    
    // Event listener for send button
    sendButton.addEventListener('click', function() {
        const message = messageInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, true);
            
            // Clear input
            messageInput.value = '';
            
            // Send message to API
            sendMessage(message);
        }
    });
    
    // Event listener for Enter key
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendButton.click();
        }
    });
});