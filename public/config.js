/**
 * Fitness AI Coach - Configuration File
 * Central place for application configuration settings
 */

const config = {
  // Application information
  app: {
    name: 'Fitness AI Coach',
    version: '1.0.0',
    copyright: '© 2025 Fitness AI Coach. All rights reserved.'
  },
  
  // API endpoints
  api: {
    n8nWebhook: 'https://guvenalex1.app.n8n.cloud/webhook/fitness-bot',
    chatgptProxy: '/api/chatgpt-proxy'
  },
  
  // Default user settings
  defaults: {
    userName: 'Test User',
    fitnessGoals: [
      'weight loss',
      'muscle gain',
      'overall fitness',
      'endurance',
      'flexibility'
    ],
    defaultGoal: 'weight loss'
  },
  
  // UI settings
  ui: {
    primaryColor: '#3182ce',
    secondaryColor: '#2c5282',
    accentColor: '#e2e8f0',
    chatBotName: 'AI Fitness Coach'
  }
};

// Make config available globally
if (typeof window !== 'undefined') {
  window.fitnessCoachConfig = config;
}

// For Node.js environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}