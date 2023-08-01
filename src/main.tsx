import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// eslint-disable-next-line react-refresh/only-export-components
const RootApp = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Setup MSW mock server in development
if (process.env.ENABLE_MOCK_SERVER === 'true') {
  // Certify MSW's Service Worker is available before start React app.
  const { worker } = await import('@/mocks/browser');
  await worker.start();
  root.render(<RootApp />); // Run <RootApp /> when Service Worker is ready to intercept requests.
} else {
  // Never setup MSW mock server if ENABLE_MOCK_SERVER is not true.
  root.render(<RootApp />);
}
