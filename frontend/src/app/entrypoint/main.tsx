// app/entrypoint/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '../providers/App';
import '../styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error(
    'Root element with id "root" not found. ' +
    'Please check your index.html file.'
  );
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Hot Module Replacement для разработки
if (import.meta.hot) {
  import.meta.hot.accept();
}