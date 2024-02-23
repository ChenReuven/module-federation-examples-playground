import React, { lazy, Suspense, useEffect, useState } from 'react';
import { runStandalone } from '../styleLoader';
import './styles.css';
import customImage from "../assets/image.png";
import customImageSvg from "../assets/image.svg";

// Lazy load a dummy component which imports another global CSS rule
const Dummy = lazy(() => import('./Dummy'));

const App = ({ isStandalone = false }) => {
  const [dummyLoaded, setDummyLoaded] = useState(false);

  useEffect(() => {
    if (!isStandalone) {
      return;
    }
    // If we receive the isStandAlone prop we will initialize the style loader in standalone mode
    runStandalone();
  }, [isStandalone]);

  return (
    <div style={{ border: '1px red solid' }}>
      <div>Remote Application - React Version {React.version}</div>
      <h2>App 2</h2>
      <img src="https://via.placeholder.com/150" alt="placeholder" />
      <img src={customImage} height="50" width="50" alt="placeholder" />
      <img src={customImageSvg} height="50" width="50" alt="placeholder" />
      <button onClick={() => setDummyLoaded(true)}>Make Everything Yellow</button>
      <input type="text" />
      {dummyLoaded && (
        <Suspense fallback={null}>
          <Dummy />
        </Suspense>
      )}
    </div>
  );
};

export default App;
