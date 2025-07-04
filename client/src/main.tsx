import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@fluentui/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import '@fluentui/react/dist/css/fabric.css';
import { initializeIcons } from '@fluentui/react/lib/Icons';

initializeIcons();


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
