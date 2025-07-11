import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from '@fluentui/react';
import '@fluentui/react/dist/css/fabric.css';
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

initializeIcons();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer position="top-right" autoClose={3000} />
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
