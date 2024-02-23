import React, { useEffect } from 'react';
import './styles.css';
import { inject, cleanup } from 'app2/appInjector';
import customImage from "../assets/image.png";
import customImageSvg from "../assets/image.svg";

const parentElementId = 'parent';

const App = () => {
  useEffect(() => {
    inject(parentElementId);
    return () => cleanup(parentElementId);
  }, []);

  // App2 will be injected in the div with parentElementId
  return (
    <div>
      <div>Host Application - React Version {React.version}</div>
      <button>Btn 1</button>
      <input type="text" />
      <img src={customImage} height="50" width="50" alt="placeholder" />
      <img src={customImageSvg} height="50" width="50" alt="placeholder" />
      <div>
        <h2>App 1</h2>
        <div id={parentElementId}></div>
      </div>
    </div>
  );
};

export default App;
