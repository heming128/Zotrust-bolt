import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Enhanced error handling with detailed logging
const root = document.getElementById('root');

if (root) {
  try {
    console.log('🚀 Starting ZedTrust App...');
    
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
    
    console.log('✅ App rendered successfully');
  } catch (error) {
    console.error('❌ App rendering error:', error);
    
    // Show detailed error information
    root.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif; background: #fff; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🚨</div>
        <h1 style="color: #dc2626; margin-bottom: 1rem;">App Loading Error</h1>
        <p style="color: #666; margin-bottom: 1rem;">Error: ${error.message || 'Unknown error'}</p>
        <p style="color: #888; margin-bottom: 2rem; font-size: 0.9rem;">Check browser console for more details</p>
        <button onclick="window.location.reload()" style="padding: 1rem 2rem; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">
          Refresh Page
        </button>
        <div style="margin-top: 2rem; padding: 1rem; background: #f3f4f6; border-radius: 8px; font-family: monospace; font-size: 0.8rem; color: #374151; max-width: 600px; text-align: left;">
          <strong>Debug Info:</strong><br>
          Error: ${error.message}<br>
          Stack: ${error.stack ? error.stack.substring(0, 200) + '...' : 'No stack trace'}
        </div>
      </div>
    `;
  }
} else {
  console.error('❌ Root element not found');
  document.body.innerHTML = `
    <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif; background: #fff; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <div style="font-size: 3rem; margin-bottom: 1rem;">🚨</div>
      <h1 style="color: #dc2626; margin-bottom: 1rem;">Root Element Not Found</h1>
      <p style="color: #666; margin-bottom: 2rem;">Could not find root element to mount the app</p>
      <button onclick="window.location.reload()" style="padding: 1rem 2rem; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">
        Refresh Page
      </button>
    </div>
  `;
}

// Global error handler
window.addEventListener('error', (event) => {
  console.error('🚨 Global error caught:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('🚨 Unhandled promise rejection:', event.reason);
});