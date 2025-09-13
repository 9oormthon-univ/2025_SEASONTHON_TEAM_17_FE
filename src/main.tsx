import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './shared/styles/index.css';
import App from './App';
import 'virtual:svg-icons-register';

const container = document.getElementById('root');
if (!container) throw new Error('Root element "#root" not found');

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
