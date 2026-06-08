import React from 'react';
import './App.css';

import NavGroup from './component/NavGroup.jsx';
import FooterTop from './component/FooterTop.jsx';
import FooterBottom from './component/FooterBottom.jsx';

function App() {
  return (
    <div className="App">
      <NavGroup />
      <FooterTop />
      <FooterBottom />
    </div>
  );
}

export default App;
