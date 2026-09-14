import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { SpeedInsights } from '@vercel/speed-insights/react';
import App from './App';

function RootApp() {
  const [showSpeedInsights, setShowSpeedInsights] = useState(false);

  useEffect(() => {
    const activateInsights = () => setShowSpeedInsights(true);

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(activateInsights, { timeout: 3500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = window.setTimeout(activateInsights, 2200);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <App />
      {showSpeedInsights ? <SpeedInsights /> : null}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RootApp />
  </React.StrictMode>
);
