import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Simple error handling
const root = document.getElementById('root');

if (root) {
  try {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    )
  } catch (error) {
    console.error('App rendering error:', error);
    root.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: Arial, sans-serif; background: #fff; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🚨</div>
        <h1 style="color: #dc2626; margin-bottom: 1rem;">App Loading Error</h1>
        <p style="color: #666; margin-bottom: 2rem;">There was an error loading the application</p>
        <button onclick="window.location.reload()" style="padding: 1rem 2rem; background: #4f46e5; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">
          Refresh Page
        </button>
      </div>
    `;
  }
} else {
  console.error('Root element not found');
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