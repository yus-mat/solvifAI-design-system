import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';
import { App } from './App';

function Root() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light');
  }, []);

  return (
    <StrictMode>
      <App />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')!).render(<Root />);
